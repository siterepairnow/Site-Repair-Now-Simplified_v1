const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1497468600133619843/sP-jvaVbQ6s1hv9-KMr3OwB7r3iTnNA-DVUoziiJJRuaez4YwNWn4F87n2eqDKKocMXR";

let submitting = false;

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("leadForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  if (submitting) return;

  const businessName = document.getElementById("businessName").value.trim();
  const websiteUrl = document.getElementById("websiteUrl").value.trim();
  const contactInfo = document.getElementById("contactInfo").value.trim();
  const honeypot = document.getElementById("companyFax")?.value.trim() || "";
  const message = document.getElementById("formMessage");

  message.textContent = "";

  // Bot trap
  if (honeypot) {
    return;
  }

  if (!businessName || !websiteUrl || !contactInfo) {
    message.textContent = "Please fill out all fields.";
    message.style.color = "#b91c1c";
    return;
  }

  submitting = true;

  const payload = {
    content: [
      "🔥 **New Site Repair Lead**",
      "",
      `**Business:** ${businessName}`,
      `**Website:** ${websiteUrl}`,
      `**Contact:** ${contactInfo}`,
      `**Submitted:** ${new Date().toLocaleString()}`
    ].join("\n")
  };

  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Discord webhook failed (${response.status})`);
    }

    message.textContent =
      "Success — your request was sent. We'll review your site and follow up.";
    message.style.color = "#047857";

    document.getElementById("leadForm").reset();
  } catch (error) {
    console.error("Webhook submit failed:", error);

    message.textContent =
      "Something went wrong. Please call or text us directly.";
    message.style.color = "#b91c1c";
  } finally {
    submitting = false;
  }
});