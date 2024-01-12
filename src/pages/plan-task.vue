<template>
    <!-- 计划任务 -->
    <v-data-table
        :items="data"
        :headers="headers"
        density="compact"
    >
    </v-data-table>
</template>
<script>
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
            headers: [
                { key: 'runFreq', title: '频率', width: '5%' },
                { key: 'flag', title: '状态', width: '5%' },
                { key: 'spName', title: 'SP 名称', width: '20%' },
                { key: 'startTime', title: '开始时间', width: '10%' },
                { key: 'endTime', title: '结束时间', width: '10%' },
                { key: 'runtime', title: '耗时(秒)', width: '5%' },
                { key: "actions", title: "操作", value: ""}
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