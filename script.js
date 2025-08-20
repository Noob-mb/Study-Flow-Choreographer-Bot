const steps = document.querySelectorAll('.step');
let index = 0;

function cycleSteps() {
  steps.forEach((step, i) => {
    step.classList.toggle('active', i === index);
  });
  index = (index + 1) % steps.length;
}

setInterval(cycleSteps, 2000);

// --- GPT Integration ---
document.getElementById("askBtn").addEventListener("click", () => {
  const question = document.getElementById("questionInput").value;
  const answerDiv = document.getElementById("answer");
  answerDiv.innerHTML = "Thinking...";

  fetch("/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question })
  })
  .then(res => res.json())
  .then(data => {
    if (data.answer) {
      answerDiv.innerHTML = `<p><strong>GPT:</strong> ${data.answer}</p>`;
    } else {
      answerDiv.innerHTML = `<p style="color:red;">Error: ${data.error}</p>`;
    }
  });
});
