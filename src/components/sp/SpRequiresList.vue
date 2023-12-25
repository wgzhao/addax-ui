<template>
    <table class="table table-sm">
        <caption>直接前置依赖执行情况</caption>
        <thead>
            <th>编号</th>
            <th>名称</th>
            <th>状态</th>
            <th>结束时间</th>
        </thead>
        <tbody>
            <template v-for="d in form">
                <tr>
                <td>{{ d.NEEDS }}</td>
                <td>{{ d.NEEDS_NAME }}</td>
                <td>{{ d.NEEDS_FLAG }}</td>
                <td>{{ d.NEEDS_END_TIME }}</td>
                </tr>
            </template>
        </tbody>
    </table>
</template>
<script>
export default {
    name: 'SpRequiresList',
    props: ['form']
}
</script>