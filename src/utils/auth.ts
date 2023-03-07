import Cookies from 'js-cookie'
import { CacheKey, sessionCache } from './cache'

export interface UserTokenData<T> {
	accessToken: string
	expires: T
	refreshToken: string
}

export function getToken(): UserTokenData<number> {
	const token = Cookies.get(CacheKey.UserTokenKey)
	return token ? JSON.parse(token) : sessionCache.getItem(CacheKey.UserTokenKey)
}

export function setToken(data: UserTokenData<Date>) {
	const { accessToken, refreshToken } = data
	const expires = new Date(data.expires).getTime()
	const tokenString = JSON.stringify({ accessToken, expires })

	if (expires > 0) {
		Cookies.set(CacheKey.UserTokenKey, tokenString, { expires: (expires - Date.now()) / 86400000 })
	} else {
		Cookies.set(CacheKey.UserTokenKey, tokenString)
	}

	sessionCache.setItem(CacheKey.UserTokenKey, {
		accessToken,
		refreshToken,
		expires
	})
}

export function removeToken() {
	Cookies.remove(CacheKey.UserTokenKey)
	sessionCache.removeItem(CacheKey.UserTokenKey)
}
