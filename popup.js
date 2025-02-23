document.addEventListener("DOMContentLoaded", function () {
    let unPopularButton = document.getElementById("unPopular_button");

    //  點擊 `Unpopular` 按鈕後，對 YouTube 頁面排序
    unPopularButton.addEventListener("click", function () {
        console.log("📢 點擊 `Unpopular` 按鈕，重新排列 YouTube 影片...");
        getViews();
    });

    //  初次載入時顯示未排序數據
    chrome.storage.local.get("youtubeVideos", function (data) {
        if (data.youtubeVideos) {
            updatePopup(data.youtubeVideos);
        }
    });
});
