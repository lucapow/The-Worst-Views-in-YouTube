//  插入 Unpopular 按鈕
function insertButton() {
    let titleElement = document.querySelector("ytd-feed-filter-chip-bar-renderer");

    if (titleElement && !titleElement.querySelector(".unpopular-button")) {
        let unPopular_button = document.createElement("button");
        unPopular_button.innerText = "Unpopular";
        unPopular_button.classList.add("unpopular-button");
        unPopular_button.style.backgroundColor = "#FF0000";
        unPopular_button.style.color = "white";
        unPopular_button.style.fontSize = "20px";
        unPopular_button.style.padding = "4px 11px";
        unPopular_button.style.marginLeft = "11px";
        unPopular_button.style.border = "dotted";
        unPopular_button.style.borderRadius = "20px"; 
        unPopular_button.style.cursor = "pointer";

        titleElement.appendChild(unPopular_button);
        console.log("✅ 按鈕已成功插入！");

        // 當按鈕被點擊時，獲取觀看數據
        unPopular_button.onclick = function () {
            console.log("📢 按鈕點擊，獲取影片數據...");
            getViews();
        };
    }
}

// 獲取 YouTube 影片數據
async function fetchYouTubeVideos() {
    let videoElements = document.querySelectorAll("ytd-grid-video-renderer, ytd-rich-item-renderer");

    let videos = [];
    videoElements.forEach(video => {
        let titleElement = video.querySelector("#video-title");
        let viewsElement = Array.from(video.querySelectorAll("span.inline-metadata-item"))
            .find(span => span.innerText.includes("views"));

        if (titleElement && viewsElement) {
            videos.push({
                title: titleElement.innerText.trim(),
                views: viewsElement.innerText.trim()
            });
        }
    });

    console.log("📊 YouTube 影片數據:", videos);

    //  存入 Chrome 擴充功能的 local storage
    chrome.storage.local.set({ "youtubeVideos": videos }, () => {
        console.log("✅ 影片數據已存入 `chrome.storage.local`");
    });

    return videos;
}

// 點擊 Unpopular 按鈕後，按觀看數排序（由低到高）
function getViews() {
    chrome.storage.local.get("youtubeVideos", function (result) {
        if (result.youtubeVideos) {
            //  按觀看數排序（低 -> 高）
            let sortedVideos = result.youtubeVideos.sort((a, b) => {
                let viewsA = parseViews(a.views);
                let viewsB = parseViews(b.views);
                return viewsA - viewsB;
            });

            console.log("📊 排序後的影片數據:", sortedVideos);

            //  更新 YouTube 頁面上的影片排序
            updateYouTubePage(sortedVideos);
        } else {
            console.log("⚠️ 無法獲取觀看數據，請稍後再試");
        }
    });
}

//  解析觀看數（支援 K、M）
function parseViews(viewsText) {
    let num = viewsText.replace(/[^0-9KM]/g, ""); // 移除非數字 & K/M
    if (viewsText.includes("M")) return parseFloat(num) * 1000000;
    if (viewsText.includes("K")) return parseFloat(num) * 1000;
    return parseInt(num) || 0;
}

//  更新 YouTube 頁面上的影片順序
function updateYouTubePage(sortedVideos) {
    let videoContainer = document.querySelector("#contents"); // YouTube 影片列表容器
    let videoElements = Array.from(document.querySelectorAll("ytd-grid-video-renderer, ytd-rich-item-renderer"));

    if (!videoContainer) {
        console.log("⚠️ 找不到 YouTube 影片容器");
        return;
    }

    videoContainer.innerHTML = ""; // 清空原本的影片列表

    sortedVideos.forEach(videoData => {
        let matchedVideo = videoElements.find(video => {
            let titleElement = video.querySelector("#video-title");
            return titleElement && titleElement.innerText.trim() === videoData.title;
        });

        if (matchedVideo) {
            videoContainer.appendChild(matchedVideo); // 依排序後的結果重新插入影片
        }
    });

    console.log("✅ YouTube 頁面影片排序完成！");
}


//  解析觀看數（支援 K、M）
function parseViews(viewsText) {
    let num = viewsText.replace(/[^0-9KM]/g, ""); // 移除非數字 & K/M
    if (viewsText.includes("M")) return parseFloat(num) * 1000000;
    if (viewsText.includes("K")) return parseFloat(num) * 1000;
    return parseInt(num) || 0;
}

//  更新 popup.html 內的影片列表
function updatePopup(videos) {
    let videoList = document.getElementById("video-list");
    videoList.innerHTML = ""; // 清空列表

    videos.forEach(video => {
        let listItem = document.createElement("li");
        listItem.innerText = `🎥 ${video.title} - 👀 ${video.views}`;
        videoList.appendChild(listItem);
    });
}


//  監聽 YouTube 頁面變化，確保按鈕 & 影片數據能正確載入
function observeDOM() {
    let observer = new MutationObserver(() => {
        insertButton();
        fetchYouTubeVideos();
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

//  確保按鈕與影片數據正確載入
document.addEventListener("DOMContentLoaded", () => {
    insertButton();
    fetchYouTubeVideos();
});
observeDOM();
// 測試函式
fetchYouTubeVideos();