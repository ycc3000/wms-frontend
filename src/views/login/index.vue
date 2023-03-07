<template>
	<div class="login-container">
		<div class="login-intro">
			<h1>{{ settings.title }}</h1>
			<div class="desc">{{ settings.description }}</div>
			<div class="login-bg"><img src="/images/login.png" alt="" /></div>
		</div>
		<div class="login-form">
			<el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" @keyup.enter="onLogin">
				<div class="login-title">{{ $t('app.signIn') }}</div>
				<el-form-item prop="username">
					<el-input v-model="loginForm.username" :prefix-icon="User" :placeholder="$t('app.username')" />
				</el-form-item>
				<el-form-item prop="password">
					<el-input v-model="loginForm.password" :prefix-icon="Lock" show-password :placeholder="$t('app.password')" />
				</el-form-item>
				<el-form-item class="login-button">
					<el-button type="primary" :loading="loading" @click="onLogin()">{{ $t('app.signIn') }}</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { useUserStore, useAppStore } from '@/store'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { FormInstance } from 'element-plus'
import { messagebox, notification } from '@/utils/message'

const router = useRouter()
const { t } = useI18n()
const loginFormRef = ref<FormInstance>()
const loading = ref(false)
const { settings } = useAppStore()

enum Reason {
	Failed = 0,
	Disabled = 1
}

const loginForm = reactive({
	username: 'admin',
	password: 'admin888'
})

const loginRules = ref({
	username: [{ required: true, message: t('required'), trigger: 'blur' }],
	password: [{ required: true, message: t('required'), trigger: 'blur' }]
})

const getErrorMessage = (reason: number) => {
	if (reason == Reason.Disabled) {
		return '账号已被锁定，请与管理员联系。'
	}
	return '错误的用户名或密码'
}

const onLogin = () => {
	if (!loginFormRef.value) {
		return
	}

	loginFormRef.value.validate(async (valid: boolean) => {
		if (!valid) {
			return false
		}
		loading.value = true
		try {
			const r = await useUserStore().LOGIN(loginForm.username, loginForm.password)
			if (r.success) {
				if (r.shouldChangePassword) {
					messagebox.warn('您使用的是默认密码，请先修改密码。').then(() => {
						router.push('/profile/change-password')
					})
					return
				}
				notification.success('登录成功')
				router.push('/')
			} else {
				notification.error(getErrorMessage(r.reason))
			}
		} finally {
			loading.value = false
		}
	})
}
</script>

<style lang="scss" scoped>
.login-container {
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	height: 100vh;
}

.login-intro {
	display: flex;
	flex-direction: column;
	width: 520px;
	flex: 0 1 auto;
}

.login-intro h1 {
	color: var(--el-color-primary);
	text-align: center;
}

.login-intro .desc {
	color: rgb(113, 115, 112);
	line-height: 32px;
	padding: 15px 0;
}

.login-bg img {
	width: 520px;
}

.login-form {
	background-color: #fff;
	flex: 0 1 auto;
	padding: 40px;
	border-radius: 6px;
	box-shadow: 1px 1px 8px #aaa6a6;
	box-sizing: border-box;

	:deep(.el-input) {
		height: 45px;
		margin-top: 5px;

		.el-input__inner {
			padding: 10px 15px 10px 5px;
			height: 45px;
			line-height: 45px;
			color: #666;
			font-size: 16px;
		}
	}
}

.login-title {
	display: flex;
	justify-content: center;
	margin-bottom: 35px;
	font-size: 24px;
	color: #444;
	letter-spacing: 4px;
}

.login-button {
	:deep(.el-button--primary) {
		margin-top: 10px;
		width: 100%;
		height: 45px;
		font-size: 18px;
		letter-spacing: 8px;
	}
}

@media only screen and (max-width: 992px) {
	.login-intro {
		display: none;
	}
}

@media only screen and (max-width: 768px) {
	.login-container {
		background: #fff;
	}

	.login-intro {
		display: none;
	}

	.login-form {
		flex: 0 1 auto;
		border-radius: 0;
		box-shadow: none;
	}
}
</style>
