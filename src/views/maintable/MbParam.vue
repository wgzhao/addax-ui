<template>
    <!-- 主表配置 -- 参数管理 -->
    <div class="row">
        <div class="col-6 ml-auto">
            <v-data-table :headers="headers" :items="dicts" density="compact">
                <template v-slot:item.actions="{ item }">
                    <v-icon size="small" class="me-2" @click="getDictionary(item.dictCode)">
                        mdi-chevron-right
                    </v-icon>
                </template>

            </v-data-table>
        </div>
        <div class="col-6 ml-auto">
            <v-data-table v-if="dictionaries" 
                :headers="dictionaryHeaders" 
                :items="dictionaries" 
                items-per-page="20"
                density="compact"
                class="elevation-1"
                >
                <template v-slot:top>
                    <v-toolbar density="compact">
                        <v-toolbar-title>参数详情</v-toolbar-title>
                        <!-- <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer> -->
                        <!-- edit/new form -->
                        <v-dialog v-model="dialog" max-width="500px">
                            <template v-slot:activator="{ props }">
                                <v-btn color="primary" class="mb-2" v-bind="props">
                                    New Item
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="text-h5">{{ formTitle }}</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-text-field v-model="editedItem.entryCode" label="参数值"></v-text-field>
                                    <v-text-field v-model="editedItem.entryValue" label="参数项"></v-text-field>
                                    <v-text-field v-model="editedItem.entryContent" label="参数名称"></v-text-field>
                                    <v-text-field v-model="editedItem.remark" label="备注"></v-text-field>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue-darken-1" variant="text" @click="close">
                                        Cancel
                                    </v-btn>
                                    <v-btn color="blue-darken-1" variant="text" @click="save">
                                        Save
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <!-- delete alert dialog -->
                        <v-dialog v-model="dialogDelete" max-width="500px">
                            <v-card>
                                <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                                    <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>

                <!-- action -->
                <template v-slot:item.actions="{ item }">
                    <v-icon size="small" class="me-2" @click="editItem(item)">
                        mdi-pencil
                    </v-icon>
                    <v-icon size="small" @click="deleteItem(item)">
                        mdi-delete
                    </v-icon>
                </template>
                <template v-slot:no-data>
                    <v-btn color="primary" @click="initialize">
                        Reset
                    </v-btn>
                </template>
            </v-data-table>

        </div>
    </div>
</template>

<script>
import axios from 'axios';


export default {
    data() {
        return {
            dicts: [],
            dictionaries: null,
            headers: [
                { title: "参数值", value: "dictCode", width: "10%" },
                { title: "参数名称", value: "dictName", width: "25%" },
                { title: "参数分类", value: "dictClass", width: "10%" },
                { title: "参数说明", value: "remark", width: "50%" },
                { title: "#", value: "actions", width: "5%" },
            ],
            dictionaryHeaders: [
                { title: "参数值", value: "entryCode" },
                { title: "参数项", value: "entryValue" },
                { title: "参数名称", value: "entryContent" },
                { title: "备注", value: "remark"},
                { title: "Action", value: "actions", width: "5%" }
            ],
            dialog: false,
            dialogDelete: false,
            editedIndex: -1,
            editedItem: {},
            defaultItem: {}
        }
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
    },
    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    created() {
        this.fetchDicts()
    },
    methods: {
        fetchDicts() {
            axios.get("/maintable/paramManage/list")
                .then(resp => {
                    this.dicts = resp.data;
                    return resp;
                })
                .catch(error => console.log(error))
        },
        getDictionary(code) {
            axios.get('/maintable/paramManage/dictionary/' + code).then(res => { this.dictionaries = res.data });
        },
        editItem(item) {
            this.editedIndex = this.dictionaries.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.dictionaries.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.dictionaries.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.dictionaries[this.editedIndex], this.editedItem)
            } else {
                this.dictionaries.push(this.editedItem)
            }
            this.close()
        },
    },
}
</script>