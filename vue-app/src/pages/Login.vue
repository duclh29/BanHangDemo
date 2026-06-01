<template>
  <div class="container-fluid p-0">
    <div class="row g-0 login-container" style="min-height: 100vh">
      <div class="col-lg-6 login-left d-none d-lg-flex">
        <div style="max-width: 520px; z-index: 10">
          <div class="d-flex align-items-center gap-3 mb-4">
            <div
              class="d-flex align-items-center justify-content-center bg-white rounded-circle shadow-sm"
              style="width: 48px; height: 48px"
            >
              <i class="bi bi-cart3 text-primary-green fs-4"></i>
            </div>
            <span
              class="serif-font fw-bold fs-2 text-white"
              style="letter-spacing: 0.5px"
              >ShoeSport</span
            >
          </div>
          <h1
            class="serif-font text-white fw-bold mb-4 fs-2"
            style="line-height: 1.35"
          >
            Thương hiệu giày thể thao đẳng cấp dành cho người yêu thể thao.
          </h1>
        </div>
        <div
          class="position-absolute bottom-0 start-0 p-4 w-100 border-top border-white-10"
          style="border-top: 1px solid rgba(255, 255, 255, 0.1) !important"
        ></div>
      </div>

      <div class="col-lg-6 login-right">
        <div class="login-form-wrapper">
          <div class="mb-4 text-center text-lg-start">
            <h2 class="serif-font text-dark fw-bold mb-2 fs-3">
              {{
                currentMode === "login"
                  ? "Chào mừng trở lại"
                  : "Tạo tài khoản mới"
              }}
            </h2>
            <p class="text-muted" style="font-size: 0.9rem">
              {{
                currentMode === "login"
                  ? "Vui lòng đăng nhập hoặc tạo tài khoản mới."
                  : "Nhập các thông tin bên dưới để bắt đầu đăng ký."
              }}
            </p>
          </div>

          <div class="login-tabs-container">
            <button
              class="login-tab"
              :class="{ active: currentMode === 'login' }"
              @click="switchTab('login')"
            >
              Đăng nhập
            </button>
            <button
              class="login-tab"
              :class="{ active: currentMode === 'register' }"
              @click="switchTab('register')"
            >
              Đăng ký
            </button>
          </div>

          <form @submit.prevent="handleFormSubmit">
            <div class="mb-3">
              <label for="emailInput" class="form-label">Email</label>
              <div class="login-input-group">
                <i class="bi bi-envelope input-icon"></i>
                <input
                  type="email"
                  class="form-control"
                  id="emailInput"
                  v-model="email"
                  placeholder=""
                  required
                />
              </div>
            </div>

            <div class="mb-4">
              <div
                class="d-flex justify-content-between align-items-center mb-2"
              >
                <label for="passwordInput" class="form-label m-0"
                  >Mật khẩu</label
                >
                <a
                  v-if="currentMode === 'login'"
                  href="#"
                  @click.prevent="forgotPassword"
                  class="text-primary-green fw-semibold text-decoration-none"
                  style="font-size: 0.8rem"
                >
                  Quên mật khẩu?
                </a>
              </div>
              <div class="login-input-group">
                <i class="bi bi-lock input-icon"></i>
                <input
                  :type="showPassword ? 'text' : 'password'"
                  class="form-control"
                  id="passwordInput"
                  v-model="password"
                  placeholder=""
                  required
                />
                <i
                  class="bi toggle-password"
                  :class="showPassword ? 'bi-eye' : 'bi-eye-slash'"
                  @click="showPassword = !showPassword"
                ></i>
              </div>
            </div>

            <div class="mb-4" v-if="currentMode === 'register'">
              <label for="confirmPasswordInput" class="form-label"
                >Xác nhận mật khẩu</label
              >
              <div class="login-input-group">
                <i class="bi bi-lock-fill input-icon"></i>
                <input
                  :type="showPassword ? 'text' : 'password'"
                  class="form-control"
                  id="confirmPasswordInput"
                  v-model="confirmPassword"
                  placeholder=""
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              class="btn btn-primary-green w-100 py-2.5 mb-4 d-flex align-items-center justify-content-center gap-2"
              style="border-radius: 50px"
            >
              <span>{{
                currentMode === "login" ? "Đăng nhập" : "Đăng ký"
              }}</span>
              <i class="bi bi-arrow-right"></i>
            </button>

            <div class="d-flex align-items-center mb-4">
              <div class="flex-grow-1 bg-light" style="height: 1px"></div>
              <span class="mx-3 text-secondary" style="font-size: 0.75rem"
                >Hoặc</span
              >
              <div class="flex-grow-1 bg-light" style="height: 1px"></div>
            </div>

            <div class="row g-3">
              <div class="col-6">
                <button
                  type="button"
                  class="btn-social-login w-100"
                  @click="socialLogin('Google')"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-google text-danger"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0c2.2 0 3.978.808 5.343 2.087l-2.28 2.28C10.007 3.328 9.122 3 8 3c-2.429 0-4.4 1.971-4.4 4.4c0 2.429 1.971 4.4 4.4 4.4c2.8 0 4.293-1.843 4.482-3.137H8v-3h7.545z"
                    />
                  </svg>
                  Google
                </button>
              </div>
              <div class="col-6">
                <button
                  type="button"
                  class="btn-social-login w-100"
                  @click="socialLogin('Facebook')"
                >
                  <i class="bi bi-facebook text-primary fs-6"></i> Facebook
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const currentMode = ref("login");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);

const switchTab = (mode) => {
  currentMode.value = mode;
  password.value = "";
  confirmPassword.value = "";
};

const handleFormSubmit = () => {
  if (currentMode.value === "login") {
    alert(`Đăng nhập thành công với tài khoản: ${email.value}!`);
    if (
      email.value.trim().toLowerCase() === "admin@shoesport.com" ||
      email.value.trim().toLowerCase() === "admin@luxcommerce.com"
    ) {
      router.push("/admin/dashboard");
    } else {
      router.push("/shop");
    }
  } else {
    if (password.value !== confirmPassword.value) {
      alert("Mật khẩu xác nhận không khớp! Vui lòng kiểm tra lại.");
      return;
    }
    alert(
      `Đăng ký tài khoản thành công cho: ${email.value}! Tiến hành đăng nhập.`,
    );
    switchTab("login");
  }
};

const forgotPassword = () => {
  alert("Link khôi phục mật khẩu đã được gửi đến email của bạn!");
};

const socialLogin = (platform) => {
  alert(`Đang tiến hành kết nối với tài khoản ${platform}...`);
  router.push("/shop");
};
</script>

<style scoped>
/* Component styles override if necessary */
</style>
