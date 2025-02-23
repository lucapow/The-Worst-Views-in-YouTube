# Worst Views in YouTube
<div align="center">
    <strong>Worst Views in YouTube is an open-source extension that sorts</strong>
</div>
<div align="center">
    YouTube channels from low to high views.
</div>
<div align="center">
    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" width="125">
</div>

 ## Why this important
 Charlie Munger once spoke about Four Foolish Things That Will Guarantee a Miserable Life.
So if you're a creator, maybe you should not just watch the most popular videos.
Instead, you should watch the least-viewed videos to analyze why they are not working.

 ## How I did this extension 
I split this extension into three parts:
1. Adding a button to YouTube channels
I used document.querySelector("")to locate the element and insert a button.
2. Fetching and sorting video views
The extension retrieves video views and sorts them from low to high.
3. Managing page interactions
When new data loads, the extension stores the data and updates the YouTube page accordingly.

## resrtion
This extension can only analyze videos that have already been loaded.
For channels with over 100 videos, the performance may degrade.
In the future, I plan to integrate the YouTube API to improve efficiency and ensure better performance.

