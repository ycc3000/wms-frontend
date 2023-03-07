<template>
	<el-dropdown class="avatar-container" trigger="hover">
		<div class="avatar-wrapper">
			<img src="/images/avatar.png" alt="" class="avatar" />
			<span>{{ username }}</span>
			<el-icon class="el-icon--right">
				<ArrowDown />
			</el-icon>
		</div>
		<template #dropdown>
			<el-dropdown-menu class="user-dropdown">
				<router-link to="/profile/change-password">
					<el-dropdown-item> {{ $t('router.changePassword') }} </el-dropdown-item>
				</router-link>
				<el-dropdown-item divided @click="logout"> {{ $t('app.signOut') }} </el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts">
import { router } from '@/router'
import { useUserStore } from '@/store'
import { ArrowDown } from '@element-plus/icons-vue'
import { ElDropdown, ElIcon, ElDropdownMenu, ElDropdownItem } from 'element-plus'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const userStore = useUserStore()

const username = computed(() => {
	return userStore.name
})

const logout = () => {
	userStore.LOGOUT()
	router.push('/login')
}
</script>

<style lang="scss" scoped>
.avatar-container {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	height: var(--theme-header-height);

	.avatar-wrapper {
		display: flex;
		align-items: center;
		white-space: nowrap;
		cursor: pointer;
		padding: 0 8px;
		color: var(--theme-header-text-color);

		.avatar {
			width: 25px;
			height: 25px;
			border-radius: 50%;
		}

		span {
			margin-left: 6px;
		}
	}

	//&:hover {
	//	background: var(--theme-header-hover-color);
	//}
}
</style>
