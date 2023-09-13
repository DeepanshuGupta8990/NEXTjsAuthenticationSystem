import Script from "next/script";

export default function UserDetails() {
  return (
    <div>
      <h1>Get user Geo location</h1>
      <Script src="/location.js"/>
    </div>
  )
}
