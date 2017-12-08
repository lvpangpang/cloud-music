let pxy = '/api';
let API = {

// 登录相关
    // 判断登录权限
    loginRefresh : pxy + '/login/refresh',
    //登录
    login : pxy + '/login/cellphone',


// 个性推荐
    // banner信息
    banner : pxy +  '/banner',

    // 推荐歌单
    personalized : pxy + '/personalized',

    // 推荐MV
    personalizedMv : pxy + '/personalized/mv',

    // 最新音乐
    newsong : pxy + '/personalized/newsong',

    //当日推荐音乐（需要登录）
    recommendSongs : pxy + '/recommend/songs',

// 歌单
    highquality : pxy + '/top/playlist/highquality',

// 排行榜
    topList : pxy + '/top/list',

// 歌单详情
    playlistdetail : pxy + '/playlist/detail',

// 搜索
    search : pxy + '/search',
    suggest : pxy + '/search/suggest',

// 播放音乐
    play : pxy + '/music/url',
    songDetail : pxy + '/song/detail',
    lyric : pxy + '/lyric',

// 播放MV
    mv : pxy + '/mv',
    mvUrl : pxy + '/mv/url',
    commentMv : pxy + '/comment/mv',
    simiMv : pxy + '/simi/mv',

// 电台
    djprogram : pxy + '/personalized/djprogram'

};
export default API;