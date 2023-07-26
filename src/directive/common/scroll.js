// js实现动态变化的数字
export  default {
    mounted(el,binding) {
        const rate = binding?.value ?? 100;
        //el就是绑定的dom对象
        if (!el) return;
        const scroll = () => {
            let parentDom = el;
            // 判断是否有滚动条
            if (parentDom.scrollHeight <= parentDom.clientHeight) return
            //判断元素是否滚动到底部(可视高度+距离顶部=整个高度)
            if (
                parentDom.scrollTop + parentDom.clientHeight ===
                parentDom.scrollHeight
            ) {
                parentDom.scrollTop = 0;
            } else {
                parentDom.scrollTop++; // 元素自增距离顶部
            }
        };
        let timer = setInterval(scroll, rate);
        el.onmouseenter = () => {
            clearInterval(timer);
            timer = null;
        };
        el.onmouseleave = function () {
            timer = setInterval(scroll, rate);
        };

    }
}

