const addCommentSubmit = async function (event) {
  event.preventDefault();

  const comment = document.querySelector("#comment");
  const post = document.querySelector("#post-id");

  const input = [];

  const response = await fetch("/api/comment/", {
    method: "POST",
    body: JSON.stringify({
      contents: comment.value,
      post_id: post.value,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/homepage");
    alert("Added to the list!");
  } else {
    alert("Failed to post");
  }
};

document
  .querySelector("#comment-form")
  .addEventListener("submit", addCommentSubmit);
