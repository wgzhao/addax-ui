<template>
    <!-- 命令列表 -->
    <table class="table table-sm table-responsive" >
        <caption class="caption-top">HADOOP存储过程 {{ header }} 的命令执行列表</caption>
        <thead>
            <th width="5%">执行顺序</th>
            <th width="10%">命令类型</th>
            <th width="40%">命令体</th>
            <th width="10%">执行开始时间</th>
            <th width="10%">执行结束时间</th>
            <th width="10%">状态</th>
            <th width="5%">Action</th>
        </thead>
        <tbody class="table-group-divider">
        <template v-for="d in form" >
            <tr>
                <td>{{ d.comIdx }}</td>
                <td>{{  d.comKind }}</td>
                <td>
                    <span v-if="d.comText.length > 50">
                        <Popper :content="d.comText" >
                            <a type="button" >{{  d.comText.substring(0, 50) }}...</a>
                        </Popper>

                    </span>
                    <span v-else><code>{{  d.comText }}</code></span>
                </td>
                <td>{{ d.startTime }}</td>
                <td>{{  d.endTime }}</td>
                <td>{{  d.flag }}</td>
                <td>运行日志</td>
            </tr>
        </template>
        </tbody>
    </table>
</template>
<script>
import Popper from 'vue3-popper'

export default {
    name: 'CmdList',
    props: ['form', 'header'],
    components: {
        Popper
    },
    methods: {
    }
}
</script>
<style>
  :root {
    --popper-theme-background-color: #333333;
    --popper-theme-background-color-hover: #333333;
    --popper-theme-text-color: #ffffff;
    --popper-theme-border-width: 0px;
    --popper-theme-border-style: solid;
    --popper-theme-border-radius: 6px;
    --popper-theme-padding: 10px;
    --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
  }
</style>