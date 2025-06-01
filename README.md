# Shipping label Test

This is a web challenge application built with [Next.js](https://nextjs.org) using the **App Router** and **TypeScript**.

---

## 🚀 How to Start

1. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## 🌐 Deployment

This project is deployed on Vercel

🔗 **Production URL**: [https://usps-shipping.vercel.app/](https://usps-shipping.vercel.app/)

---

## 🧱 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Forms:** React Hook Form
- **Deployment:** Vercel

---

## 📁 Env variables

The following environment variables are required to run the application. These will be provided via email.

```
POSTMEN_API_KEY={YOUR_POSTMEN_API_KEY}
SHIPPER_ACCOUNT_ID={YOUR_SHIPPER_ACCOUNT_ID}
```


## 📁 API

Initially, the project was intended to use [EasyPost](https://app.easypost.com/) for shipment and label generation. However, their platform did not allow API key generation during setup, and despite reaching out to their support team, no response was received.

As a result, I integrated [AfterShip's Tracking API](https://www.aftership.com/docs/tracking/quickstart/api-quick-start) instead. It provides similar shipment tracking and label generation features and was easy to set up and use as an alternative.

When using AfterShip, I opted for **FedEx** instead of **USPS**, as USPS was not fully functional or accessible through their test environment at the time.



## ⚠️ TO BE NOTICED

- The `.gif` animation and the background image are **not optimized**. The original SVG asset is premium, so a `.gif` version was used instead. I’m fully aware of the file size and performance tradeoff, this is meant **just to illustrate**.
- Some form fields are **pre-filled** for faster testing during development. However, all fields are **editable** and **required** for submission.

---

## 🚧 WHAT'S NEXT

- I would like to create a custom `<Button />` component similar to the other reusable components in the project.
- The mobile version could use some further refinements and polishing.
- In general, the codebase could benefit from a bit more cleanup and additional componentization.
- I would also like to find time to integrate a **PDF viewer** and use it to preview the generated shipping label directly in the UI.