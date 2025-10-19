document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const readerFrame = document.getElementById('readerFrame');
    const categoryList = document.getElementById('categoryList');
    const iframeLoading = document.getElementById('iframeLoading');
    const readerTitle = document.getElementById('readerTitle');
    
    // 分类数据
    const categories = [
        {
            name: "都市娱乐",
            url: "https://www.jingjiaoba.com/du-shi-yu-le",
            desc: "都市生活、娱乐明星、职场商战等现代背景小说"
        },
        {
            name: "奇幻玄幻",
            url: "https://www.jingjiaoba.com/qi-huan-xuan-huan",
            desc: "西方奇幻、东方玄幻、魔法修真等幻想题材"
        },
        {
            name: "武侠仙侠",
            url: "https://www.jingjiaoba.com/wu-xia-xian-xia",
            desc: "传统武侠、修真仙侠、江湖恩怨等题材"
        },
        {
            name: "竞技游戏",
            url: "https://www.jingjiaoba.com/jing-ji-you-xi",
            desc: "电子竞技、网游、体育竞技等题材"
        },
        {
            name: "科幻灵异",
            url: "https://www.jingjiaoba.com/ke-huan-ling-yi",
            desc: "科幻未来、灵异恐怖、悬疑推理等题材"
        },
        {
            name: "历史军事",
            url: "https://www.jingjiaoba.com/li-shi-jun-shi",
            desc: "历史穿越、军事战争、架空历史等题材"
        },
        {
            name: "二次元",
            url: "https://www.jingjiaoba.com/jing-xiao-er-ci-yuan",
            desc: "动漫同人、轻小说、宅文等二次元题材"
        }
    ];
    
    // 隐藏加载动画
    iframeLoading.style.display = 'none';
    
    // 搜索功能
    function performSearch() {
        const keyword = searchInput.value.trim();
        if (keyword) {
            // 显示加载动画
            iframeLoading.style.display = 'flex';
            
            // 编码关键词并构建URL
            const encodedKeyword = encodeURIComponent(keyword);
            const searchUrl = `https://www.jingjiaoba.com/?s=${encodedKeyword}`;
            
            // 更新iframe的src和title
            readerFrame.src = searchUrl;
            readerFrame.title = `小说搜索结果 - 关键词：${keyword}`;
            
            // 更新标题
            readerTitle.textContent = `阅读器 - 搜索"${keyword}"`;
            
            // 移除分类选中状态
            document.querySelectorAll('.category-item').forEach(item => {
                item.classList.remove('active');
            });
        }
    }
    
    // 初始化分类列表
    function initCategoryList() {
        categories.forEach((category, index) => {
            const categoryItem = document.createElement('div');
            categoryItem.className = 'category-item';
            categoryItem.setAttribute('data-url', category.url);
            categoryItem.setAttribute('role', 'button');
            categoryItem.setAttribute('tabindex', '0');
            categoryItem.setAttribute('aria-label', `浏览${category.name}分类`);
            
            categoryItem.innerHTML = `
                <div class="category-title">${category.name}</div>
                <div class="category-desc">${category.desc}</div>
            `;
            
            // 添加点击事件
            categoryItem.addEventListener('click', function() {
                selectCategory(category, index);
            });
            
            // 添加键盘支持
            categoryItem.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectCategory(category, index);
                }
            });
            
            categoryList.appendChild(categoryItem);
        });
        
        // 默认选择第一个分类
        if (categories.length > 0) {
            selectCategory(categories[0], 0);
        }
    }
    
    // 选择分类
    function selectCategory(category, index) {
        // 移除之前选中的分类的高亮
        document.querySelectorAll('.category-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // 高亮当前选中的分类
        document.querySelectorAll('.category-item')[index].classList.add('active');
        
        // 显示加载动画
        iframeLoading.style.display = 'flex';
        
        // 更新iframe的src
        readerFrame.src = category.url;
        readerFrame.title = `小说分类 - ${category.name}`;
        
        // 更新标题
        readerTitle.textContent = `阅读器 - ${category.name}`;
        
        // 清空搜索框
        searchInput.value = '';
    }
    
    // 事件监听
    searchBtn.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // iframe加载完成处理
    readerFrame.addEventListener('load', function() {
        iframeLoading.style.display = 'none';
    });
    
    // iframe加载错误处理
    readerFrame.addEventListener('error', function() {
        iframeLoading.style.display = 'none';
        
        // 创建友好的错误提示页面
        const errorHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>页面加载失败</title>
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        text-align: center; 
                        padding: 50px; 
                        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .error-container { 
                        max-width: 500px; 
                        margin: 0 auto; 
                        background: white;
                        padding: 30px;
                        border-radius: 10px;
                        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                    }
                    .error-icon { 
                        font-size: 48px; 
                        color: #ff6b6b; 
                        margin-bottom: 20px; 
                    }
                    h2 { color: #333; margin-bottom: 15px; }
                    p { color: #666; margin-bottom: 15px; line-height: 1.6; }
                    ul { text-align: left; display: inline-block; margin-bottom: 20px; }
                    li { margin-bottom: 8px; color: #666; }
                    .retry-btn {
                        background: #6a11cb;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 1rem;
                        transition: background 0.3s;
                    }
                    .retry-btn:hover {
                        background: #5a0db5;
                    }
                </style>
            </head>
            <body>
                <div class="error-container">
                    <div class="error-icon">⚠️</div>
                    <h2>页面加载失败</h2>
                    <p>无法连接到小说页面，这可能是因为：</p>
                    <ul>
                        <li>网络连接问题</li>
                        <li>目标网站暂时不可用</li>
                        <li>该页面链接已失效</li>
                        <li>网站阻止了嵌入访问</li>
                    </ul>
                    <p>请尝试搜索其他内容或选择其他分类。</p>
                    <button class="retry-btn" onclick="window.location.reload()">重新加载</button>
                </div>
            </body>
            </html>
        `;
        
        // 使用Blob URL显示错误页面
        const blob = new Blob([errorHtml], { type: 'text/html' });
        const blobUrl = URL.createObjectURL(blob);
        readerFrame.src = blobUrl;
    });
    
    // 初始加载
    initCategoryList();
});