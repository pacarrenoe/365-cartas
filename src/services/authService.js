const API_KEY = "AIzaSyBdsPxOXnq51S0HdbDtZU5f9_uVOqUakSg";

export async function login(email, password) {
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true
      })
    }
  );

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    const code = data?.error?.message;

    if (code === "INVALID_LOGIN_CREDENTIALS" || code === "EMAIL_NOT_FOUND" || code === "INVALID_PASSWORD") {
      throw new Error("El correo o la contraseña no son correctos.");
    }

    if (code === "TOO_MANY_ATTEMPTS_TRY_LATER") {
      throw new Error("Demasiados intentos. Espera un momento antes de volver a intentar.");
    }

    throw new Error("No pudimos iniciar sesión. Inténtalo nuevamente.");
  }

  return res.json(); // idToken, refreshToken, expiresIn
}
