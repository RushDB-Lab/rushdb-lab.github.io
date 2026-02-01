<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: "global" });
</script>

<template>
  <section class="section" id="members">
    <h2 class="section-title">
      {{ t("members.title") }}
    </h2>
    <div class="members-grid">
      <a href="https://mmmttt000045.github.io" class="card-link" target="_blank" rel="noopener noreferrer">
        <div class="member-card">
          <div class="member-avatar">
            <img src="/MingTai.png" alt="明泰" class="avatar-img" loading="lazy" decoding="async" />
          </div>
          <div class="member-name">
            {{ t("members.mingTai.name") }}
          </div>
          <div class="member-info">
            <div class="member-detail">
              <span class="detail-icon">🎓</span>
              {{ t("members.mingTai.school") }}
            </div>
            <div class="member-detail">
              <span class="detail-icon">💻</span>
              {{ t("members.mingTai.major") }}
            </div>
            <div class="member-detail">
              <span class="detail-icon">📧</span>
              <span>202219121521@stu.cdut.edu.cn</span>
            </div>
            <div class="member-detail">
              <span class="detail-icon">📍</span>
              {{ t("members.mingTai.location") }}
            </div>
          </div>
        </div>
      </a>

      <a href="https://huxin0817.github.io/" class="card-link" target="_blank" rel="noopener noreferrer">
        <div class="member-card">
          <div class="member-avatar">
            <img src="/HuXin.png" alt="胡鑫" class="avatar-img" loading="lazy" decoding="async" />
          </div>
          <div class="member-name">
            {{ t("members.huXin.name") }}
          </div>
          <div class="member-info">
            <div class="member-detail">
              <span class="detail-icon">🎓</span>
              {{ t("members.huXin.school") }}
            </div>
            <div class="member-detail">
              <span class="detail-icon">💻</span>
              {{ t("members.huXin.major") }}
            </div>
            <div class="member-detail">
              <span class="detail-icon">📧</span>
              <span>202219120810@stu.cdut.edu.cn</span>
            </div>
            <div class="member-detail">
              <span class="detail-icon">📍</span>
              {{ t("members.huXin.location") }}
            </div>
          </div>
        </div>
      </a>

      <a href="https://koschei.top/" class="card-link" target="_blank" rel="noopener noreferrer">
        <div class="member-card">
          <div class="member-avatar">
            <img src="/WuYiMin.png" alt="吴奕民" class="avatar-img" loading="lazy" decoding="async" />
          </div>
          <div class="member-name">
            {{ t("members.wuYiMin.name") }}
          </div>
          <div class="member-info">
            <div class="member-detail">
              <span class="detail-icon">🎓</span>
              {{ t("members.wuYiMin.school") }}
            </div>
            <div class="member-detail">
              <span class="detail-icon">💻</span>
              {{ t("members.wuYiMin.major") }}
            </div>
            <div class="member-detail">
              <span class="detail-icon">📧</span>
              <span>nitianzero@gmail.com</span>
            </div>
            <div class="member-detail">
              <span class="detail-icon">📍</span>
              {{ t("members.wuYiMin.location") }}
            </div>
          </div>
        </div>
      </a>
    </div>
  </section>
</template>
