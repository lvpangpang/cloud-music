const pxy = 'http://47.94.16.170:3000';
const API = {
// 个性推荐
    // banner信息
    banner : pxy +  '/banner',

    // 推荐歌单
    personalized : pxy + '/personalized',

    // 推荐MV
    personalizedMv : pxy + '/personalized/mv',

    // 最新音乐
    newsong : pxy + '/personalized/newsong',

// 歌单
    highquality : pxy + '/top/playlist/highquality',

// 歌单详情
    playlistdetail : pxy + '/playlist/detail',

// 搜索
    search : pxy + '/search'
};
export default API;