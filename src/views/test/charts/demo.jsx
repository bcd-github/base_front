/** @format */

import { defineComponent } from "vue"

export default defineComponent({
  setup(props) {
    const a = ref(100)
    // 逻辑
    return () => (
      <div>
        <p>{a.value}</p>
        <p
          onClick={() => {
            a.value++
          }}
        >
          这个是默认插槽内容：
        </p>
        <p>这个是具名插槽内容：</p>
        <p>这个是作用域插槽</p>
      </div>
    )
  }
})
