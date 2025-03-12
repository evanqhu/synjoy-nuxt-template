<!-- 隐私协议 -->
<script setup lang="ts">
definePageMeta({
  title: 'Privacy Policy',
})

const { webConfig } = useAppStore()
</script>

<template>
  <div class="legal-content">
    <div class="app-content-wrapper">
      <div class="app-content">
        <h2 class="title">
          Privacy Policy
        </h2>
        <p>Welcome to {{ webConfig.webUrl }}. We are committed to protecting your privacy and ensuring your personal information is handled responsibly. This Privacy Policy explains how we collect, use, and protect your information.</p>
        <div class="terms-list">
          <div class="term-item">
            <h3 class="term-title">
              1. Eligibility
            </h3>
            <p>Our services are intended for users who are 13 years of age or older. By using our services, you confirm that you meet this age requirement.</p>
          </div>
          <div class="term-item">
            <h3 class="term-title">
              2. Information We Collect
            </h3>
            <ul>
              <li>Google Login Information: We use Google Login to authenticate users. This allows us to access basic profile information such as your name and email address.</li>
              <li>Usage Data: We collect data on how you interact with our website using Firebase Analytics. This includes information such as your IP address, browser type, device information, and pages visited. This data helps us improve our services and user experience.</li>
            </ul>
          </div>
          <div class="term-item">
            <h3 class="term-title">
              3. Cookies
            </h3>
            <p>{{ capitalizeFirstLetter(webConfig.webUrl) }} does not use cookies to track or store personal information. However, third-party services like Google may use cookies as part of their login process.</p>
          </div>
          <div class="term-item">
            <h3 class="term-title">
              4. How We Use Your Information
            </h3>
            <ul>
              <li>Service Provision: To provide and maintain our image generation services.</li>
              <li>Improvements: To analyze usage patterns and improve our website functionality and user experience.</li>
              <li>Communication: To send you updates, security alerts, and other information related to your use of our services.</li>
            </ul>
          </div>
          <div class="term-item">
            <h3 class="term-title">
              5. Data Sharing and Disclosure
            </h3>
            <ul>
              <li>We do not sell or rent your personal information to third parties.</li>
              <li>
                We may share your information with service providers who assist us in operating our website and conducting our business, subject to confidentiality agreements.
              </li>
              <li>
                We may disclose your information if required by law or in response to legal requests.
              </li>
            </ul>
          </div>
          <div class="term-item">
            <h3 class="term-title">
              6. Data Security
            </h3>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, use, or disclosure.
            </p>
          </div>
          <div class="term-item">
            <h3 class="term-title">
              7. Third-Party Services
            </h3>
            <p>Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies.</p>
          </div>
          <div class="term-item">
            <h3 class="term-title">
              8. User Rights
            </h3>
            <ul>
              <li>
                Access and Correction: You have the right to access and correct your personal information.
              </li>
              <li>
                Deletion: You may request the deletion of your personal information, subject to legal obligations.
              </li>
              <li>
                Opt-Out: You can opt out of receiving promotional communications from us by following the unsubscribe instructions in those communications.
              </li>
            </ul>
          </div>
          <div class="term-item">
            <h3 class="term-title">
              9. Changes to This Privacy Policy
            </h3>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on our website. Please review this policy periodically for any updates.
            </p>
          </div>
          <div class="term-item">
            <h3 class="term-title">
              10. Contact Information
            </h3>
            <p>
              If you have any questions or concerns about this Privacy Policy, please contact us at <a :href="`mailto:${webConfig.webEmail}`" class="mail">{{ webConfig.webEmail }}</a>.
            </p>
            <p>
              By using {{ webConfig.webUrl }}, you consent to the collection and use of your information as outlined in this Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
