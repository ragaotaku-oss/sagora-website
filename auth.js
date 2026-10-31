document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  document.querySelectorAll(".year").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  const DEMO_SESSION_KEY = "sagoraDemoUser";

  function saveDemoUser(name, email, provider) {
    const user = {
      name: name || "SAGORA Guest",
      email: email || "Demo account",
      provider: provider || "Demo"
    };

    sessionStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(user));
    window.location.href = "dashboard.html";
  }

  // Password show/hide
  document.querySelectorAll(".password-toggle").forEach(button => {
    button.addEventListener("click", () => {
      const input = document.getElementById(button.dataset.toggle);
      if (!input) return;

      const hidden = input.type === "password";
      input.type = hidden ? "text" : "password";
      button.textContent = hidden ? "Hide" : "Show";
    });
  });

  // Login demo
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", event => {
      event.preventDefault();

      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value;
      const message = document.getElementById("loginMessage");

      if (!email || !password) {
        message.textContent = "Please enter your email and password.";
        return;
      }

      const name = email.split("@")[0];
      saveDemoUser(name, email, "Email Demo");
    });
  }

  // Signup demo
  const signupForm = document.getElementById("signupForm");

  if (signupForm) {
    signupForm.addEventListener("submit", event => {
      event.preventDefault();

      const name = document.getElementById("signupName").value.trim();
      const email = document.getElementById("signupEmail").value.trim();
      const password = document.getElementById("signupPassword").value;
      const confirm = document.getElementById("confirmPassword").value;
      const message = document.getElementById("signupMessage");

      if (password.length < 6) {
        message.textContent = "Password must contain at least 6 characters.";
        return;
      }

      if (password !== confirm) {
        message.textContent = "Passwords do not match.";
        return;
      }

      saveDemoUser(name, email, "Email Signup Demo");
    });
  }

  // Social sign-in demo buttons
  document.querySelectorAll("[data-demo-provider]").forEach(button => {
    button.addEventListener("click", () => {
      const provider = button.dataset.demoProvider;

      if (provider === "Phone OTP") {
        const phone = prompt("Enter a demo phone number:");
        if (!phone || phone.trim().length < 10) {
          alert("Please enter a valid demo phone number.");
          return;
        }

        const code = prompt(
          "DEMO OTP: 123456\nEnter the demo OTP shown above:"
        );

        if (code !== "123456") {
          alert("Incorrect demo OTP. Try 123456.");
          return;
        }

        saveDemoUser("Phone User", phone.trim(), "Phone OTP Demo");
        return;
      }

      saveDemoUser(
        provider + " Demo User",
        provider.toLowerCase() + "-demo@example.com",
        provider + " Demo"
      );
    });
  });

  // Forgot password demo
  const forgot = document.getElementById("forgotPassword");

  if (forgot) {
    forgot.addEventListener("click", event => {
      event.preventDefault();
      alert(
        "This is a demo website. Real password recovery will be available after authentication setup."
      );
    });
  }

  // Protect dashboard in this browser demo
  const userText = document.getElementById("userName");

  if (userText) {
    const stored = sessionStorage.getItem(DEMO_SESSION_KEY);

    if (!stored) {
      window.location.replace("login.html");
      return;
    }

    try {
      const user = JSON.parse(stored);
      userText.textContent = user.name || "SAGORA Guest";
    } catch {
      sessionStorage.removeItem(DEMO_SESSION_KEY);
      window.location.replace("login.html");
      return;
    }
  }

  // Logout
  const logout = document.getElementById("logoutButton");

  if (logout) {
    logout.addEventListener("click", () => {
      sessionStorage.removeItem(DEMO_SESSION_KEY);
      window.location.href = "login.html";
    });
  }
});