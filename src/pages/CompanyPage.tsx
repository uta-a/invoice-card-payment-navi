import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function CompanyPage() {
  usePageMeta(
    "運営会社 | 請求書カード払いナビ",
    "請求書カード払いナビの運営会社情報。運営者・所在地等の情報を掲載しています。"
  );

  const companyInfo = [
    { label: "サイト名", value: "請求書カード払いナビ" },
    { label: "運営者", value: "XXXX" },
    { label: "所在地", value: "XXXX" },
    { label: "設立", value: "XXXX" },
    { label: "事業内容", value: "XXXX" },
    { label: "メールアドレス", value: "XXXX" },
    { label: "URL", value: "XXXX" },
  ];

  return (
    <div
      style={{
        background: "#F0F9FF",
        minHeight: "100vh",
        paddingTop: "2rem",
        paddingBottom: "5rem",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Breadcrumb */}
        <nav
          style={{
            display: "flex",
            gap: "0.375rem",
            fontSize: "0.8125rem",
            marginBottom: "1.5rem",
          }}
        >
          <Link to="/" style={{ color: "#2AABE2", textDecoration: "none" }}>
            ホーム
          </Link>
          <span style={{ color: "#1A2B4A" }}>&gt;</span>
          <span style={{ color: "#1A2B4A" }}>運営会社</span>
        </nav>

        {/* Content Card */}
        <div
          style={{
            background: "#fff",
            borderRadius: "1rem",
            border: "1px solid #DDE5F0",
            padding: "2rem",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
              fontWeight: 700,
              color: "#1A2B4A",
              marginBottom: "1.5rem",
            }}
          >
            運営会社
          </h1>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.9375rem",
              color: "#1A2B4A",
            }}
          >
            <tbody>
              {companyInfo.map((item) => (
                <tr key={item.label}>
                  <th
                    style={{
                      textAlign: "left",
                      fontWeight: 700,
                      padding: "1rem",
                      borderBottom: "1px solid #DDE5F0",
                      whiteSpace: "nowrap",
                      verticalAlign: "top",
                      width: "30%",
                      background: "#F8FAFC",
                    }}
                  >
                    {item.label}
                  </th>
                  <td
                    style={{
                      padding: "1rem",
                      borderBottom: "1px solid #DDE5F0",
                      lineHeight: 1.8,
                    }}
                  >
                    {item.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
