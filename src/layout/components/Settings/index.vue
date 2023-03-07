<template>
	<div class="navbar-settings">
		<svg-icon icon="icon-ellipsis-v" @click="visible = true" />
		<el-drawer v-model="visible" :title="$t('settings.title')" :destroy-on-close="true" :size="280">
			<el-scrollbar class="settings-container">
				<el-space direction="vertical" alignment="flex-start">
					<el-space>
						<el-tooltip key="dark" effect="dark" :content="$t('settings.sidebarDark')" placement="top">
							<div
								class="settings-box-item item-left-dark"
								:class="theme.sidebarStyle === 'dark' ? 'active' : ''"
								@click="setSidebarTheme('dark')"
							></div>
						</el-tooltip>
						<el-tooltip key="light" effect="dark" :content="$t('settings.sidebarLight')" placement="top">
							<div
								class="settings-box-item item-left-light"
								:class="theme.sidebarStyle === 'light' ? 'active' : ''"
								@click="setSidebarTheme('light')"
							></div>
						</el-tooltip>
					</el-space>
					<el-space>
						<el-tooltip key="light" effect="dark" :content="$t('settings.navbarLight')" placement="top">
							<div
								class="settings-box-item item-top-light"
								:class="theme.headerStyle === 'light' ? 'active' : ''"
								@click="setHeaderTheme('light')"
							></div>
						</el-tooltip>
						<el-tooltip key="auto" effect="dark" :content="$t('settings.navbarTheme')" placement="top">
							<div
								class="settings-box-item item-top-theme"
								:class="theme.headerStyle === 'theme' ? 'active' : ''"
								@click="setHeaderTheme('theme')"
							></div>
						</el-tooltip>
					</el-space>
					<el-space :size="2" wrap>
						<div v-for="color in colors" :key="color">
							<span
								class="theme-color"
								:class="theme.primaryColor === color ? 'active' : ''"
								:style="`background-color: ${color}`"
								@click="setThemeColor(color)"
							></span>
						</div>
					</el-space>
				</el-space>

				<el-divider content-position="left">{{ $t('settings.interface') }}</el-divider>
				<SwitchItem v-model="theme.uniqueOpened" :title="$t('settings.uniqueOpened')" @change="setOtherTheme" />
				<SwitchItem v-model="theme.isLogo" :title="$t('settings.logo')" @change="setOtherTheme" />
				<SwitchItem v-model="theme.isBreadcrumb" :title="$t('settings.breadcrumb')" @change="setOtherTheme" />
				<SwitchItem v-model="theme.isTabsView" :title="$t('settings.tabs')" @change="setOtherTheme" />
				<SwitchItem v-model="theme.isTabsCache" :title="$t('settings.tabsCache')" @change="setOtherTheme" />
				<SelectItem v-model="theme.tabsStyle" :title="$t('settings.tabsStyle')" :options="tabsStyles" @change="setOtherTheme" />
				<el-divider />
				<el-button type="info" class="config-btn" :icon="RefreshRight" @click="reset">
					{{ $t('settings.reset') }}
				</el-button>
			</el-scrollbar>
		</el-drawer>
	</div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { RefreshRight } from '@element-plus/icons-vue'
import SwitchItem from './components/SwitchItem.vue'
import SelectItem from './components/SelectItem.vue'
import { setThemeStyle } from '@/utils/theme'

const { t } = useI18n()
// const { copy } = useClipboard()
const store = useAppStore()
const visible = ref(false)
const colors = [
	'#409eff',
	'#0BB2D4',
	'#3E8EF7',
	'#11C26D',
	'#17B3A3',
	'#667AFA',
	'#997B71',
	'#9463F7',
	'#757575',
	'#EB6709',
	'#F74584',
	'#FCB900',
	'#FF4C52'
]

const tabsStyles = [
	{ label: t('settings.style1'), value: 'style-1' },
	{ label: t('settings.style2'), value: 'style-2' }
]

const theme = computed(() => store.theme)

const setSidebarTheme = (style: string) => {
	theme.value.sidebarStyle = style
	store.SET_THEME(theme.value)
}

const setHeaderTheme = (style: string) => {
	theme.value.headerStyle = style
	store.SET_THEME(theme.value)
}

const setOtherTheme = () => {
	store.SET_THEME(theme.value)
}

const setThemeColor = (color: string) => {
	theme.value.primaryColor = color
	store.SET_THEME(theme.value)

	setThemeStyle(theme.value)
}

const reset = () => {
	store.REMOVE_THEME()
	window.location.reload()
}
</script>

<style lang="scss" scoped>
.navbar-settings {
	::v-deep(.el-drawer) {
		--el-drawer-padding-primary: unset !important;
	}
}

.settings-container {
	padding: 15px;
	color: #444444;

	.settings-box-item {
		position: relative;
		width: 50px;
		height: 35px;
		margin: 0 20px 20px 0;
		background-color: rgb(240 242 245);
		border-radius: 3px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
		cursor: pointer;

		&.active {
			&::after {
				content: '';
				width: 6px;
				height: 6px;
				border-radius: 50%;
				background-color: var(--el-color-primary);
				position: absolute;
				left: 50%;
				bottom: -15px;
			}
		}
	}

	.item-left-light {
		&::before {
			position: absolute;
			top: 0;
			left: 0;
			width: 33%;
			height: 100%;
			background-color: #fff;
			content: '';
			border-top-left-radius: 3px;
			border-bottom-left-radius: 3px;
		}
	}

	.item-left-dark {
		&::before {
			position: absolute;
			top: 0;
			left: 0;
			width: 33%;
			height: 100%;
			background-color: #000;
			content: '';
			border-top-left-radius: 3px;
			border-bottom-left-radius: 3px;
		}
	}

	.item-top-light {
		&::before {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 33%;
			background-color: #fff;
			content: '';
			border-top-left-radius: 3px;
			border-top-right-radius: 3px;
		}
	}

	.item-top-theme {
		&::before {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 33%;
			background-color: var(--el-color-primary);
			content: '';
			border-top-left-radius: 3px;
			border-top-right-radius: 3px;
		}
	}

	.theme-color {
		width: 20px;
		height: 20px;
		margin: 8px 8px 0 0;
		border-radius: 2px;
		display: inline-block;
		vertical-align: top;
		position: relative;
		cursor: pointer;

		&.active {
			&::after {
				content: url('data:image/svg+xml;charset=utf-8,<svg width="14" height="14" color="rgb(255 255 255)" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-042ca774=""><path fill="currentColor" d="M406.656 706.944L195.84 496.256a32 32 0 10-45.248 45.248l256 256 512-512a32 32 0 00-45.248-45.248L406.592 706.944z"></path></svg>');
				-webkit-font-smoothing: antialiased;
				-moz-osx-font-smoothing: grayscale;
				position: absolute;
				top: 50%;
				left: 50%;
				margin: -7px 0 0 -7px;
				font-size: 14px;
				color: #ffffff;
			}
		}
	}

	.config-btn {
		width: 100%;
		margin-top: 10px;
	}
}
</style>
