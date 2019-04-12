const baseUrl = 'https://news-at.zhihu.com';

const Api = {
    latest: baseUrl + '/api/4/news/latest',
    details: baseUrl + '/api/4/news/',
    before: baseUrl + '/api/4/news/before/',
    section: baseUrl + '/api/4/section/',
    extra: baseUrl + '/api/4/story-extra/',
    longComments: baseUrl + '/api/4/story/',
    shortComments: baseUrl + '/api/4/story/',
}
export { Api }