/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "startpage"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"fkTIeplkXxVaHWJC","label":"Media","bookmarks":[{"id":"FZxEkvCcHU1rcISF","label":"9anime","url":"https://9anime.me"},{"id":"v1eXyx5d3DGukT0V","label":"youtube","url":"https://www.youtube.com/"},{"id":"7l9APzoVGF8Wv2Rc","label":"twitch","url":"https://www.twitch.tv/"}]},{"id":"0bUU4iUhhjyTecZ9","label":"Discord","bookmarks":[{"id":"tDlcPfWYU5xXlQjS","label":"shelter mod","url":"https://github.com/uwu/shelter"},{"id":"FfeV06fMvagungnu","label":"API's to block","url":"https://luna.gitlab.io/discord-unofficial-docs/science.html"},{"id":"5U0JFiWu0CseIKUw","label":"Web App","url":"https://discord.com/app"},{"id":"L7dVvtdsdeT6pi8Q","label":"Dev Portal","url":"https://discord.com/developers/applications"}]},{"id":"hjWEvx41UJT9Gqzv","label":"Useful","bookmarks":[{"id":"GL023VyLxiknkgHD","label":" Ad Free Music","url":"https://github.com/th-ch/youtube-music"},{"id":"iILoLDfXFHJjRRiE","label":"Password Manager","url":"https://keepassxc.org/"},{"id":"qUdJwAzfs1pmFom5","label":"Web Captioner","url":"https://webcaptioner.com/captioner"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
