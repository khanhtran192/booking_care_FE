export const Token = {
	key: "access-token",
	get() {
		return localStorage.getItem(this.key) ?? undefined;
	},
	set(newToken: string) {
		return localStorage.setItem(this.key, newToken);
	},
	remove() {
		return localStorage.removeItem(this.key);
	},
};
