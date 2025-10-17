<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h2 class="text-h4 mb-4">系统配置</h2>
                <p class="text-body-1 text-medium-emphasis mb-6">
                    系统首次安装后，请完成以下必要的配置项以确保系统正常运行。
                </p>
            </v-col>
        </v-row>

        <v-form ref="form" v-model="valid" @submit.prevent="saveSettings">
            <!-- 基础系统配置 -->
            <v-card class="mb-6" elevation="2">
                <v-card-title class="bg-primary text-white">
                    <v-icon class="mr-2">mdi-cog</v-icon>
                    基础系统配置
                </v-card-title>
                <v-card-text class="pa-6">
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="settings.ADDAX" label="Addax程序目录" placeholder="/opt/app/addax"
                                prepend-inner-icon="mdi-folder" :rules="[rules.required]" hint="Addax程序的安装目录路径"
                                persistent-hint />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="settings.HIVE_CLI" label="HIVE 命令行" placeholder="hive"
                                prepend-inner-icon="mdi-console" :rules="[rules.required]" hint="Hive命令行工具的路径或命令"
                                persistent-hint />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="settings.HDFS_PREFIX" label="HDFS 目录前缀" placeholder="/ods"
                                prepend-inner-icon="mdi-folder-network" :rules="[rules.required]" hint="HDFS存储的根目录前缀"
                                persistent-hint />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="settings.SWITCH_TIME" label="切日时间" placeholder="16:30"
                                prepend-inner-icon="mdi-clock" :rules="[rules.required, rules.timeFormat]"
                                hint="系统切日的时间点，格式：HH:mm" persistent-hint />
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>

            <!-- 存储配置 -->
            <v-card class="mb-6" elevation="2">
                <v-card-title class="bg-info text-white">
                    <v-icon class="mr-2">mdi-database</v-icon>
                    存储配置
                </v-card-title>
                <v-card-text class="pa-6">
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-select v-model="settings.HDFS_STORAGE_FORMAT" label="存储格式" :items="storageFormats"
                                prepend-inner-icon="mdi-file-document" :rules="[rules.required]" hint="HDFS存储文件格式"
                                persistent-hint />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-select v-model="settings.HDFS_COMPRESS_FORMAT" label="压缩格式" :items="compressFormats"
                                prepend-inner-icon="mdi-zip-box" :rules="[rules.required]" hint="HDFS存储文件压缩格式"
                                persistent-hint />
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>

            <!-- HiveServer2 配置 -->
            <v-card class="mb-6" elevation="2">
                <v-card-title class="bg-success text-white">
                    <v-icon class="mr-2">mdi-server</v-icon>
                    HiveServer2 配置
                </v-card-title>
                <v-card-text class="pa-6">
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="hiveServer2Config.url" label="JDBC连接地址"
                                placeholder="jdbc:hive2://188.166.1.96:10000" prepend-inner-icon="mdi-link"
                                :rules="[rules.required, rules.jdbcUrl]" hint="HiveServer2的JDBC连接地址" persistent-hint />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-text-field v-model="hiveServer2Config.user" label="用户名" placeholder="hive"
                                prepend-inner-icon="mdi-account" :rules="[rules.required]" hint="连接HiveServer2的用户名"
                                persistent-hint />
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field v-model="hiveServer2Config.password"
                                :type="showPassword ? 'text' : 'password'" label="密码" placeholder="请输入密码"
                                prepend-inner-icon="mdi-lock"
                                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                @click:append-inner="showPassword = !showPassword" :rules="[rules.required]"
                                hint="连接HiveServer2的密码" persistent-hint />
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field v-model="hiveServer2Config.driverPath" label="驱动路径"
                                placeholder="/path/to/hive-jdbc.jar" prepend-inner-icon="mdi-file-code"
                                :rules="[rules.required]" hint="Hive JDBC驱动的文件路径" persistent-hint />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-btn color="info" variant="outlined" prepend-icon="mdi-connection"
                                @click="testHiveConnection" :loading="testingConnection">
                                测试连接
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>

            <!-- 性能配置 -->
            <v-card class="mb-6" elevation="2">
                <v-card-title class="bg-warning text-white">
                    <v-icon class="mr-2">mdi-speedometer</v-icon>
                    性能配置
                </v-card-title>
                <v-card-text class="pa-6">
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field v-model.number="settings.CONCURRENT_LIMIT" label="最大采集并发数量" type="number"
                                placeholder="30" prepend-inner-icon="mdi-flash"
                                :rules="[rules.required, rules.positiveNumber]" hint="同时进行的最大采集任务数量" persistent-hint />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model.number="settings.QUEUE_SIZE" label="采集队列长度" type="number"
                                placeholder="100" prepend-inner-icon="mdi-queue-first-in-last-out"
                                :rules="[rules.required, rules.positiveNumber]" hint="采集任务队列的最大长度" persistent-hint />
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>

            <!-- 操作按钮 -->
            <v-card elevation="2">
                <v-card-actions class="pa-6">
                    <v-btn color="info" variant="outlined" prepend-icon="mdi-download" @click="exportConfig"
                        class="mr-2">
                        导出配置
                    </v-btn>
                    <v-btn color="warning" variant="outlined" prepend-icon="mdi-upload" @click="triggerFileInput"
                        class="mr-2">
                        导入配置
                    </v-btn>
                    <input ref="fileInput" type="file" accept=".json" style="display: none" @change="importConfig" />
                    <v-btn color="error" variant="outlined" prepend-icon="mdi-restore" @click="resetToDefault"
                        class="mr-2">
                        恢复默认
                    </v-btn>
                    <v-spacer />
                    <v-btn color="primary" size="large" type="submit" :disabled="!valid" :loading="saving"
                        prepend-icon="mdi-content-save">
                        保存配置
                    </v-btn>
                    <v-btn color="secondary" size="large" variant="outlined" @click="resetForm" class="ml-4"
                        prepend-icon="mdi-refresh">
                        重置
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-container>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { notify } from '@/stores/notifier'
import settingsService, { type HiveServer2Config, type SystemConfig } from '@/service/settings-service'

// 表单引用和状态
const form = ref<any>(null)
const valid = ref(false)
const saving = ref(false)
const testingConnection = ref(false)
const showPassword = ref(false)

// 配置项接口定义
interface SystemSettings {
    HIVE_CLI: string
    HDFS_STORAGE_FORMAT: string
    HDFS_COMPRESS_FORMAT: string
    ADDAX: string
    HDFS_PREFIX: string
    SWITCH_TIME: string
    CONCURRENT_LIMIT: number
    QUEUE_SIZE: number
}

// 配置数据
const settings = reactive<SystemSettings>({
    HIVE_CLI: 'hive',
    HDFS_STORAGE_FORMAT: 'parquet',
    HDFS_COMPRESS_FORMAT: 'snappy',
    ADDAX: '/opt/app/addax',
    HDFS_PREFIX: '/ods',
    SWITCH_TIME: '16:30',
    CONCURRENT_LIMIT: 30,
    QUEUE_SIZE: 100
})

const hiveServer2Config = reactive<HiveServer2Config>({
    url: '',
    user: 'hive',
    password: '',
    driverPath: ''
})

// 选项数据
const storageFormats = [
    { title: 'Parquet', value: 'parquet' },
    { title: 'ORC', value: 'orc' }
]

const compressFormats = [
    { title: 'Snappy', value: 'snappy' },
    { title: 'LZ4', value: 'lz4' },
    { title: 'GZ', value: 'gz' },
    { title: 'ZSTD', value: 'zstd' }
]

// 验证规则
const rules = {
    required: (value: any) => {
        if (typeof value === 'number') return value !== null && value !== undefined || '此字段为必填项'
        return !!value || '此字段为必填项'
    },
    positiveNumber: (value: number) => {
        return value > 0 || '请输入大于0的数字'
    },
    timeFormat: (value: string) => {
        if (!value) return '此字段为必填项'
        const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/
        return timeRegex.test(value) || '时间格式不正确，请使用 HH:mm 格式（如：16:30）'
    },
    jdbcUrl: (value: string) => {
        if (!value) return '此字段为必填项'
        const jdbcRegex = /^jdbc:hive2:\/\/.+$/
        return jdbcRegex.test(value) || 'JDBC地址格式不正确，应以 jdbc:hive2:// 开头'
    }
}

// 测试Hive连接
const testHiveConnection = async () => {
    testingConnection.value = true
    try {
        const result = await settingsService.testHiveConnection(hiveServer2Config)
        if (result) {
            notify('HiveServer2连接测试成功', 'success')
        } else {
            notify('HiveServer2连接测试失败', 'warning')
        }
    } catch (error: any) {
        notify('HiveServer2连接测试失败: ' + (error.message || error), 'error')
    } finally {
        testingConnection.value = false
    }
}

// 保存配置
const saveSettings = async () => {
    const { valid: isValid } = await form.value.validate()
    if (!isValid) {
        notify('请修正表单中的错误', 'error')
        return
    }

    saving.value = true
    try {
        // 构建完整的配置对象，确保数字字段转换为字符串以匹配后端格式
        const configData: SystemConfig = {
            HIVE_CLI: settings.HIVE_CLI,
            HDFS_STORAGE_FORMAT: settings.HDFS_STORAGE_FORMAT,
            HDFS_COMPRESS_FORMAT: settings.HDFS_COMPRESS_FORMAT,
            ADDAX: settings.ADDAX,
            HDFS_PREFIX: settings.HDFS_PREFIX,
            SWITCH_TIME: settings.SWITCH_TIME,
            CONCURRENT_LIMIT: String(settings.CONCURRENT_LIMIT),
            QUEUE_SIZE: String(settings.QUEUE_SIZE),
            HIVE_SERVER2: JSON.stringify(hiveServer2Config)
        }

        const result = await settingsService.saveSettings(configData)
        if (result) {
            notify('系统配置保存成功', 'success')
        } else {
            notify('保存配置失败', 'warning')
        }
    } catch (error: any) {
        notify('保存配置失败: ' + (error.message || error), 'error')
    } finally {
        saving.value = false
    }
}

// 重置表单
const resetForm = () => {
    // 重置为默认值
    Object.assign(settings, {
        HIVE_CLI: 'hive',
        HDFS_STORAGE_FORMAT: 'parquet',
        HDFS_COMPRESS_FORMAT: 'snappy',
        ADDAX: '/opt/app/addax',
        HDFS_PREFIX: '/ods',
        SWITCH_TIME: '16:30',
        CONCURRENT_LIMIT: 30,
        QUEUE_SIZE: 100
    })

    Object.assign(hiveServer2Config, {
        url: '',
        user: 'hive',
        password: '',
        driverPath: ''
    })

    form.value?.reset()
    notify('表单已重置', 'info')
}

// 加载现有配置
const loadSettings = async () => {
    try {
        const config = await settingsService.getSettings()

        // 添加调试信息
        console.log('从后端获取的配置:', config)

        // 检查配置是否存在
        if (!config) {
            console.warn('配置数据为空，使用默认配置')
            notify('配置数据为空，已加载默认配置', 'warning')
            return
        }

        // 直接从配置对象中读取值
        if (config.HIVE_SERVER2) {
            try {
                const hiveConfig = JSON.parse(config.HIVE_SERVER2)
                Object.assign(hiveServer2Config, hiveConfig)
            } catch (e) {
                console.warn('解析HIVE_SERVER2配置失败:', e)
            }
        }

        // 更新基础配置，注意数字字段需要转换
        Object.assign(settings, {
            HIVE_CLI: config.HIVE_CLI || 'hive',
            HDFS_STORAGE_FORMAT: config.HDFS_STORAGE_FORMAT || 'parquet',
            HDFS_COMPRESS_FORMAT: config.HDFS_COMPRESS_FORMAT || 'snappy',
            ADDAX: config.ADDAX || '/opt/app/addax',
            HDFS_PREFIX: config.HDFS_PREFIX || '/ods',
            SWITCH_TIME: config.SWITCH_TIME || '16:30',
            CONCURRENT_LIMIT: Number(config.CONCURRENT_LIMIT) || 30,
            QUEUE_SIZE: Number(config.QUEUE_SIZE) || 100
        })

        console.log('配置加载完成', config)
    } catch (error: any) {
        console.error('加载配置失败:', error)
        // 如果是网络错误或其他错误，使用默认配置并提示用户
        notify('加载配置失败，已使用默认配置: ' + (error.message || error), 'warning')
    }
}

// 导出配置
const exportConfig = async () => {
    try {
        const blob = await settingsService.exportConfig()
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `system-config-${new Date().toISOString().slice(0, 10)}.json`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
        notify('配置导出成功', 'success')
    } catch (error: any) {
        notify('配置导出失败: ' + (error.message || error), 'error')
    }
}

// 导入配置
const fileInput = ref<HTMLInputElement>()

// 触发文件输入框
const triggerFileInput = () => {
    fileInput.value?.click()
}

const importConfig = async (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    if (!file) return

    try {
        const result = await settingsService.importConfig(file)
        if (result) {
            notify('配置导入成功，正在重新加载...', 'success')
            await loadSettings() // 重新加载配置
        } else {
            notify('配置导入失败', 'warning')
        }
    } catch (error: any) {
        notify('配置导入失败: ' + (error.message || error), 'error')
    } finally {
        // 清空文件输入框
        if (target) target.value = ''
    }
}

// 恢复默认配置
const resetToDefault = async () => {
    try {
        const confirmed = confirm('确定要将所有配置恢复为默认值吗？此操作不可撤销。')
        if (!confirmed) return

        const result = await settingsService.resetToDefault()
        if (result) {
            notify('配置已恢复为默认值，正在重新加载...', 'success')
            await loadSettings() // 重新加载配置
        } else {
            notify('恢复默认配置失败', 'warning')
        }
    } catch (error: any) {
        notify('恢复默认配置失败: ' + (error.message || error), 'error')
    }
}

// 组件挂载时加载配置
onMounted(() => {
    console.log('设置页面组件已挂载，开始加载配置...')
    loadSettings()
})
</script>
<style scoped>
.v-card-title {
    font-weight: 600;
}

/* 使用主题适配的表面颜色 */
.v-card-text {
    background-color: rgb(var(--v-theme-surface));
}

/* 深色模式下的优化 */
.v-theme--dark .v-card-text {
    background-color: #2B2C40;
    /* 使用主题中定义的深色表面颜色 */
}

/* 深色模式下输入框的背景色优化 */
.v-theme--dark .v-text-field .v-field__field {
    background-color: #444463 !important;
    /* 使用主题中的 grey-100 */
}

.v-theme--dark .v-select .v-field__field {
    background-color: #444463 !important;
    /* 使用主题中的 grey-100 */
}

.v-theme--dark .v-textarea .v-field__field {
    background-color: #444463 !important;
    /* 使用主题中的 grey-100 */
}

/* 深色模式下输入框边框颜色 */
.v-theme--dark .v-text-field .v-field__outline {
    color: #5E6692 !important;
    /* 使用主题中的 grey-300 */
}

.v-theme--dark .v-select .v-field__outline {
    color: #5E6692 !important;
    /* 使用主题中的 grey-300 */
}

/* 深色模式下文本颜色 */
.v-theme--dark .v-text-field input,
.v-theme--dark .v-select .v-field__input,
.v-theme--dark .v-textarea textarea {
    color: #DBDBEB !important;
    /* 使用主题中的 on-surface 颜色 */
}

/* 浅色模式下保持合适的背景色 */
.v-theme--light .v-card-text {
    background-color: #FAFAFA;
    /* 使用主题中的 grey-50 */
}

/* 提示文字颜色优化 */
.v-theme--dark .v-messages__message {
    color: #8692D0 !important;
    /* 使用主题中的 grey-500 */
}

/* 标签颜色优化 */
.v-theme--dark .v-label {
    color: #AAB3DE !important;
    /* 使用主题中的 grey-600 */
}
</style>