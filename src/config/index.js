export const BASE_URL = process.env.NODE_ENV === 'production' ? 'http://www.vanorama.fr/backoffice' : 'http://www.vanorama.fr/backoffice'
export const API = `${BASE_URL}/wp-json/wp/v2`
export const ACF_API = `${BASE_URL}/wp-json/acf/v3`
export const PER_PAGE = 3

// STORE ACTIONS

// STORE MUTATIONS
export const NAVIGATE_FULLSCREEN = 'navigateFullscreen'
export const RESET_FULLSCREEN = 'resetFullscreen'
export const SET_FULLSCREEN = 'setFullscreen'
