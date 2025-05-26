const TOKEN_KEY = 'accessToken'

export function getTokenFromLocalStorage(): string | null {
	const token = localStorage.getItem(TOKEN_KEY)
	return token ? JSON.parse(token) : null
}

export function setTokenToLocalStorage(token: string): void {
	localStorage.setItem(TOKEN_KEY, JSON.stringify(token))
}

export function removeTokenFromLocalStorage(): void {
	localStorage.removeItem(TOKEN_KEY)
}
