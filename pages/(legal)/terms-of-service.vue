<!-- 服务条款 -->
<script setup lang="ts">
definePageMeta({
  title: 'Terms of Service',
})

const { webConfig } = useAppStore()
</script>

<template>
  <div class="legal-content">
    <div class="app-content-wrapper">
      <div class="app-content">
        <h2 class="title">
          Terms of Service
        </h2>
        <p>
          Welcome to {{ webConfig.webUrl }}. By accessing and using our website, you agree to comply with the following terms and conditions. Please read them carefully.
        </p>
        <div class="terms-list">
          <div class="term-item">
            <h3 class="term-title">
              1. Eligibility
            </h3>
            <p>You must be at least 13 years old to use our services. By accessing this site, you confirm that you meet this age requirement and have the legal capacity to enter into this agreement.</p>
          </div>
          <div class="term-item">
            <h3 class="term-title">
              2. Service Description
            </h3>
            <p>{{ capitalizeFirstLetter(webConfig.webUrl) }} provides AI-driven image generation services using a commercial version of ChatGPT. Users can access these services through a credit-based system. Credits can be purchased through our platform.</p>
          </div>
          <div class="term-item">
            <h3 class="term-title">
              3. Account Registration and Security
            </h3>
            <ul>
              <li>
                Login: Users must log in via their Google account. By doing so, you authorize us to access certain Google account information.
              </li>
              <li>Security: You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. Notify us immediately of any unauthorized use.</li>
            </ul>
          </div>
          <div class="term-item">
            <h3 class="term-title">
              4. Usage Restrictions
            </h3>
            <ul>
              <li>You agree not to use the website for any unlawful activities or to infringe upon the rights of others.</li>
              <li>Generated images are intended for lawful purposes only. You must not use the images for any illegal, harmful, or offensive activities.</li>
            </ul>
          </div>
          <div class="term-item">
            <h3 class="term-title">
              5. Intellectual Property
            </h3>
            <ul>
              <li>User Content: You retain ownership of the images you generate. By using our services, you grant {{ webConfig.webUrl }} a non-exclusive, worldwide, royalty-free license to use, reproduce, and display the content solely for service provision and improvement.</li>
              <li>Platform Rights: All technology, software, and content on the site, not provided by users, are owned by {{ webConfig.webUrl }} and are protected by intellectual property laws.</li>
            </ul>
          </div>
          <div class="term-item">
            <h3 class="term-title">
              6. User Conduct
            </h3>
            <p>You agree to:</p>
            <ul>
              <li>Use the service in compliance with all applicable laws and regulations.</li>
              <li>Refrain from uploading or sharing content that is harmful, threatening, or violates any third-party rights.</li>
            </ul>
          </div>
          <div class="term-item">
            <h3 class="term-title">
              7. Termination of Access
            </h3>
            <p>{{ capitalizeFirstLetter(webConfig.webUrl) }} reserves the right to terminate or suspend your access to the services at any time, with or without notice, for conduct that violates this agreement or is harmful to other users or the business.</p>
          </div>
          <div class="term-item">
            <h3 class="term-title">
              8. Modifications to Service
            </h3>
            <p>We reserve the right to modify, suspend, or discontinue any aspect of the service at any time, including the availability of any feature, database, or content, with or without notice.</p>
          </div>
          <div class="term-item">
            <h3 class="term-title">
              9. Limitation of Liability
            </h3>
            <p>
              To the fullest extent permitted by law, {{ webConfig.webUrl }} shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to, loss of profits, data, or other intangibles, even if advised of the possibility of such damages.
            </p>
          </div>
          <div class="term-item">
            <h3 class="term-title">
              10. Indemnification
            </h3>
            <p>
              You agree to indemnify, defend, and hold harmless {{ webConfig.webUrl }}, its affiliates, and their respective officers, directors, employees, and agents from any claims, losses, liabilities, damages, costs, or expenses (including reasonable attorneys' fees) arising out of your use of the service, your violation of this agreement, or your violation of any rights of another.
            </p>
          </div>
          <div class="term-item">
            <h3 class="term-title">
              11. Severability
            </h3>
            <p>
              If any provision of this agreement is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect.
            </p>
          </div>
          <div class="term-item">
            <h3 class="term-title">
              12. Entire Agreement
            </h3>
            <p>
              This agreement constitutes the entire agreement between you and {{ webConfig.webUrl }} regarding your use of the service and supersedes any prior agreements.
            </p>
          </div>
          <div class="term-item">
            <h3 class="term-title">
              13. Contact Information
            </h3>
            <p>
              For any questions or concerns about this agreement, please contact our customer support team at <a :href="`mailto:${webConfig.webEmail}`" class="mail">{{ webConfig.webEmail }}</a>.
            </p>
            <p>
              By using {{ webConfig.webUrl }}, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
