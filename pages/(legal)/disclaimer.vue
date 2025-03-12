<!-- 免责声明 -->
<script setup lang="ts">
definePageMeta({
  title: 'Disclaimer',
})

const { webConfig } = useAppStore()
</script>

<template>
  <div class="legal-content">
    <div class="app-content-wrapper">
      <div class="app-content">
        <h2 class="title">
          Disclaimer
        </h2>
        <div class="terms-list">
          <div class="term-item">
            <h3 class="term-title">
              1. Copyright Infringement Claims
            </h3>
            <p>
              Making original work is challenging! As outlined in our Use Restrictions policy, you cannot use Pixel2Magic products to create or distribute work that infringes on the intellectual property rights of others beyond the bounds of fair use.
            </p>
          </div>
          <div class="term-item">
            <h3 class="term-title">
              2. Notification of Copyright Infringement Claims
            </h3>
            <p>
              If you are a copyright owner and believe that an account user of any product we operate has infringed on your work(s), you have the right to notify us under the Digital Millennium Copyright Act (17 U.S.C. § 512). To be effective, your notification of claimed infringement must be written and include the following information:
            </p>
            <ul>
              <li>
                A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.
              </li>
              <li>
                Identification of the copyrighted work(s) claimed to have been infringed. If multiple works are involved, please provide a representative list.
              </li>
              <li>
                Details on how to locate the material you believe is infringing.
              </li>
              <li>
                Your name and contact information, preferably an email address, but a telephone number or mailing address is also acceptable.
              </li>
              <li>
                A statement that you have a good faith belief that the use of the material is not authorized by the copyright owner, its agent, or the law.
              </li>
              <li>
                A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the owner of the exclusive right that is allegedly infringed.
              </li>
            </ul>
          </div>
          <div class="term-item">
            <h3 class="term-title">
              3. DMCA Counter-notifications
            </h3>
            <p>
              If you believe your material was removed in error, you can file a written counter-notification. Please include the following information:
            </p>
            <ul>
              <li>
                A physical or electronic signature, or the signature of a person authorized to act on your behalf.
              </li>
              <li>
                A description of the material that was removed.
              </li>
              <li>
                A description of where the material appeared on Pixel2Magic products prior to its removal.
              </li>
              <li>
                Your name and contact information, preferably an email address, but a telephone number or mailing address is also acceptable.
              </li>
              <li>
                A statement under penalty of perjury that you have a good faith belief that the material was removed or disabled due to a mistake or misidentification.
              </li>
              <li>
                A statement that you consent to the jurisdiction of the Federal District Court for the judicial district where your address is located, or if outside the United States, in the jurisdiction where Pixel2Magic is located.
              </li>
              <li>
                A statement that you will accept service of process from the person who filed the original DMCA notice or an agent of that person.
              </li>
            </ul>
          </div>
          <p>
            Please contact us at <a :href="`mailto:${webConfig.webEmail}`" class="mail">{{ webConfig.webEmail }}</a> for any claims or counter-notifications.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
