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

  if (!res.ok) throw new Error("Login inválido");
  return res.json(); // idToken, refreshToken, expiresIn
}
