// Original code by Carl Schwan
// https://carlschwan.eu/2020/12/29/adding-comments-to-your-static-blog-with-mastodon/

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function emojify(input, emojis) {
    let output = input;

    emojis.forEach(emoji => {
        let picture = document.createElement("picture");
        picture.innerHTML = `
        <source srcset="${escapeHtml(emoji.url)}" media="(prefers-reduced-motion: no-preference)">
        <img class="emoji" src="${escapeHtml(emoji.static_url)}" alt=":${emoji.shortcode}:" title=":${emoji.shortcode}:" width="20" height="20">
        `
        output = output.replace(`:${emoji.shortcode}:`, picture.outerHTML);
    });

    return output;
}

function loadComments({ host, username, postId }) {
    let commentsWrapper = document.getElementById("comments-wrapper");
    let loadBtn = document.getElementById("load-comment");
    loadBtn.innerHTML = "Loading";

    fetch(`https://${host}/api/v1/statuses/${postId}/context`)
        .then(
            response => response.json(),
            err => {
                console.error(err);
                loadBtn.innerHTML = "Load Comments";
                commentsWrapper.innerHTML = `<div class="no-comments">Failed to load comments.</div>`;
            }
        )
        .then(data => {
            let descendants = data['descendants'];
            if (!Array.isArray(descendants)) {
                loadBtn.innerHTML = "Load Comments";
                commentsWrapper.innerHTML = `<div class="no-comments">Failed to load comments.</div>`;
                return;
            }

            if (descendants.length === 0) {
                loadBtn.innerHTML = "Load Comments";
                commentsWrapper.innerHTML = `<div class="no-comments">No comments yet.</div>`;
                return;
            }

            loadBtn.style.display = "none";
            descendants.forEach(function (status) {
                if (status.account.display_name.length > 0) {
                    status.account.display_name = escapeHtml(status.account.display_name);
                    status.account.display_name = emojify(status.account.display_name, status.account.emojis);
                } else {
                    status.account.display_name = status.account.username;
                };

                let instance = "";
                if (status.account.acct.includes("@")) {
                    instance = status.account.acct.split("@")[1];
                } else {
                    instance = host;
                }

                const isReply = status.in_reply_to_id !== "{{ .id }}";
                const op = (status.account.acct == username);

                status.content = emojify(status.content, status.emojis);

                const opClass = op ? "op" : "";
                const opTitle = op ? "Blog post author; " : "";

                let comment = document.createElement("article");
                comment.id = `comment-${status.id}`;
                comment.setAttribute("itemprop", "comment");
                comment.setAttribute("itemtype", "http://schema.org/Comment");
                comment.className = isReply ? "comment comment-reply" : "comment";
                if (op) {
                    comment.classList.add("op");
                }
                comment.innerHTML = `
                <a class="avatar-link ${opClass}" href="${status.account.url}" rel="external nofollow" title="${opTitle}View profile at @${status.account.username}@${instance}">
                    <picture>
                        <source srcset="${escapeHtml(status.account.avatar)}" media="(prefers-reduced-motion: no-preference)">
                        <img class="avatar ${opClass}" src="${escapeHtml(status.account.avatar_static)}"
                            alt="@${status.account.username}@${instance} avatar"
                            title="${opTitle}View profile at @${status.account.username}@${instance}"
                        >
                    </picture>
                </a>
                <header class="author">
                    <span class="display" itemprop="author" itemscope itemtype="http://schema.org/Person">${status.account.display_name}</span>
                    <a class="instance ${opClass}" href="${status.account.url}" title="${opTitle}@${status.account.username}@${instance}" rel="external nofollow">${instance}</a>
                </header>
                <time datetime="${status.created_at}">
                    <a href="${status.url}" itemprop="url" title="View comment at ${instance}" rel="external nofollow">${new Date(status.created_at).toLocaleString('en-US', { dateStyle: "long", timeStyle: "short" })}</a>
                </time>
                <main itemprop="text">${status.content}</main>
                <footer>
                    ${status.favourites_count > 0 ? `<a class="faves" href="${status.url}/favourites" title="Favorites from ${instance}">${status.favourites_count}</a>` : ""}
                </footer>
                `;

                commentsWrapper.innerHTML += DOMPurify.sanitize(comment.outerHTML);
            });
        });
}

document.getElementById("load-comment").addEventListener("click", (event) => {
    loadComments({
        host: event.target.dataset.host,
        username: event.target.dataset.username,
        postId: event.target.dataset.postId
    });
})
