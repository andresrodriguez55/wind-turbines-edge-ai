const USER="{}";

export function setUser(user)
{
    deleteUser();
    user["token"] = "Bearer "+user["token"];
    localStorage.setItem(USER, JSON.stringify(user));
}

export function getUser()
{
  return JSON.parse(localStorage.getItem(USER));
}

export function deleteUser()
{
  localStorage.removeItem(USER);
}