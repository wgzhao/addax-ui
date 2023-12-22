<template>
    <!-- 计划任务 -->

    <p>
        <button @click="showModal">Show Modal</button>
    </p>
    <p>
        <button type="button" class="btn btn-sm btn-outline-primary" data-bs-toggle="modal" @click="showModal(1)"
            data-bs-target="#impSpDetail">主表详情</button>
    </p>

    <div class="modal fade" id="impSpDetail" tabindex="-1" aria-labelledby="impSpDetailLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="impSpDetailLabel">HADOOP存储过程主表配置</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    {{ data }}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="close">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import SpDetail from '../components/sp/Detail.vue'


export default {
    name: 'PlanTask',
    data() {
        return {
            open: false,
            // spdetail: null,
            data: null,
            isModalVisible: false,
            val: 2,
            options: {
                response: true,
                select: false,
                paging: true,
                searching: true,
                info: true,
                lengthChange: true,
                pageLength: 10,
                lengthMenu: [[10, 25, 50, -1], [10, 25, 50, 'All']],
                buttons: ["copy", "excel", "pdf"],
                dom: "Bfrltip"
            },
            columns: [
                { data: 'runFreq', title: '频率', width: '5%' },
                { data: 'flag', title: '状态', width: '5%' },
                { data: 'spName', title: 'SP 名称', width: '20%' },
                { data: 'startTime', title: '开始时间', width: '10%' },
                { data: 'endTime', title: '结束时间', width: '10%' },
                { data: 'runtime', title: '耗时(秒)', width: '5%' },
                {
                    data: null, orerable: false, title: '操作', width: '20%', render: function (data) {
                        let btn = '<button type="button" class="btn btn-sm btn-outline-primary" data-bs-toggle="modal" @click=';
                        let cmds = ["showDetail", "showCmd", "showLogs", "showScene", "showLineage", "showRequires"];
                        let titles = ["主表详情", "命令列表", "调度日志", "使用场景", "计算溯源", "前置情况"]
                        let result = ""
                        let i = 0;
                        for (; i < cmds.length; i++) {
                            result = result + btn + cmds[i] + "('" + data.spId + "') id='" + cmds[i] + "'>" + titles[i] + "</button>"
                        }
                        return result;
                    }
                }
            ],
        }
    },
    components: {
    },

    mounted() {
        this.addTrigger();
    },
    methods: {
        addTrigger() {
            const el = document.getElementById("impSpDetail");
            this.$emit("show.bs.modal");
            el.addEventListener('show.bs.modal', () => {
                this.data = "hello, Modal";
            })
        },
        showModal(val) {
            this.isModalVisible = true;
            this.data = val;
            console.log(val);
        },
        closeModal() {
            this.isModalVisible = false;
        }
    }
}
</script>