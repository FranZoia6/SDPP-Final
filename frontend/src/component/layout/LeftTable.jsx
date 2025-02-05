import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LeftOption = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [user_id, setUser_id] = useState("");
  const [amount, setAmount] = useState("");
  const { user, getAccessTokenSilently } = useAuth0();

  const handleSubmit = async () => {
    try {
      const accessToken =
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhkNHJvUklXTnNsTmhIZnc5bXdsYSJ9.eyJpc3MiOiJodHRwczovL2Jsb2NrY2hhaW5zZC51cy5hdXRoMC5jb20vIiwic3ViIjoiNlk4aGFmQ2d6M0ROa0R6c0dLa2swYkI1alVpa2hYWmRAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vYmxvY2tjaGFpbnNkLnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNzM4NzkyNzY4LCJleHAiOjE3Mzg4NzkxNjgsInNjb3BlIjoicmVhZDpjbGllbnRfZ3JhbnRzIGNyZWF0ZTpjbGllbnRfZ3JhbnRzIGRlbGV0ZTpjbGllbnRfZ3JhbnRzIHVwZGF0ZTpjbGllbnRfZ3JhbnRzIHJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIGRlbGV0ZTp1c2VycyBjcmVhdGU6dXNlcnMgcmVhZDp1c2Vyc19hcHBfbWV0YWRhdGEgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBkZWxldGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgcmVhZDp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBkZWxldGU6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX3RpY2tldHMgcmVhZDpjbGllbnRzIHVwZGF0ZTpjbGllbnRzIGRlbGV0ZTpjbGllbnRzIGNyZWF0ZTpjbGllbnRzIHJlYWQ6Y2xpZW50X2tleXMgdXBkYXRlOmNsaWVudF9rZXlzIGRlbGV0ZTpjbGllbnRfa2V5cyBjcmVhdGU6Y2xpZW50X2tleXMgcmVhZDpjb25uZWN0aW9ucyB1cGRhdGU6Y29ubmVjdGlvbnMgZGVsZXRlOmNvbm5lY3Rpb25zIGNyZWF0ZTpjb25uZWN0aW9ucyByZWFkOnJlc291cmNlX3NlcnZlcnMgdXBkYXRlOnJlc291cmNlX3NlcnZlcnMgZGVsZXRlOnJlc291cmNlX3NlcnZlcnMgY3JlYXRlOnJlc291cmNlX3NlcnZlcnMgcmVhZDpkZXZpY2VfY3JlZGVudGlhbHMgdXBkYXRlOmRldmljZV9jcmVkZW50aWFscyBkZWxldGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGNyZWF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgcmVhZDpydWxlcyB1cGRhdGU6cnVsZXMgZGVsZXRlOnJ1bGVzIGNyZWF0ZTpydWxlcyByZWFkOnJ1bGVzX2NvbmZpZ3MgdXBkYXRlOnJ1bGVzX2NvbmZpZ3MgZGVsZXRlOnJ1bGVzX2NvbmZpZ3MgcmVhZDpob29rcyB1cGRhdGU6aG9va3MgZGVsZXRlOmhvb2tzIGNyZWF0ZTpob29rcyByZWFkOmFjdGlvbnMgdXBkYXRlOmFjdGlvbnMgZGVsZXRlOmFjdGlvbnMgY3JlYXRlOmFjdGlvbnMgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDppbnNpZ2h0cyByZWFkOnRlbmFudF9zZXR0aW5ncyB1cGRhdGU6dGVuYW50X3NldHRpbmdzIHJlYWQ6bG9ncyByZWFkOmxvZ3NfdXNlcnMgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIHVwZGF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHVwZGF0ZTpjdXN0b21fZG9tYWlucyByZWFkOmVtYWlsX3RlbXBsYXRlcyBjcmVhdGU6ZW1haWxfdGVtcGxhdGVzIHVwZGF0ZTplbWFpbF90ZW1wbGF0ZXMgcmVhZDptZmFfcG9saWNpZXMgdXBkYXRlOm1mYV9wb2xpY2llcyByZWFkOnJvbGVzIGNyZWF0ZTpyb2xlcyBkZWxldGU6cm9sZXMgdXBkYXRlOnJvbGVzIHJlYWQ6cHJvbXB0cyB1cGRhdGU6cHJvbXB0cyByZWFkOmJyYW5kaW5nIHVwZGF0ZTpicmFuZGluZyBkZWxldGU6YnJhbmRpbmcgcmVhZDpsb2dfc3RyZWFtcyBjcmVhdGU6bG9nX3N0cmVhbXMgZGVsZXRlOmxvZ19zdHJlYW1zIHVwZGF0ZTpsb2dfc3RyZWFtcyBjcmVhdGU6c2lnbmluZ19rZXlzIHJlYWQ6c2lnbmluZ19rZXlzIHVwZGF0ZTpzaWduaW5nX2tleXMgcmVhZDpsaW1pdHMgdXBkYXRlOmxpbWl0cyBjcmVhdGU6cm9sZV9tZW1iZXJzIHJlYWQ6cm9sZV9tZW1iZXJzIGRlbGV0ZTpyb2xlX21lbWJlcnMgcmVhZDplbnRpdGxlbWVudHMgcmVhZDphdHRhY2tfcHJvdGVjdGlvbiB1cGRhdGU6YXR0YWNrX3Byb3RlY3Rpb24gcmVhZDpvcmdhbml6YXRpb25zX3N1bW1hcnkgY3JlYXRlOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMgcmVhZDphdXRoZW50aWNhdGlvbl9tZXRob2RzIHVwZGF0ZTphdXRoZW50aWNhdGlvbl9tZXRob2RzIGRlbGV0ZTphdXRoZW50aWNhdGlvbl9tZXRob2RzIHJlYWQ6b3JnYW5pemF0aW9ucyB1cGRhdGU6b3JnYW5pemF0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9uX21lbWJlcnMgcmVhZDpvcmdhbml6YXRpb25fbWVtYmVycyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyByZWFkOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyB1cGRhdGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgcmVhZDpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIGRlbGV0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIGNyZWF0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgcmVhZDpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyByZWFkOnNjaW1fY29uZmlnIGNyZWF0ZTpzY2ltX2NvbmZpZyB1cGRhdGU6c2NpbV9jb25maWcgZGVsZXRlOnNjaW1fY29uZmlnIGNyZWF0ZTpzY2ltX3Rva2VuIHJlYWQ6c2NpbV90b2tlbiBkZWxldGU6c2NpbV90b2tlbiBkZWxldGU6cGhvbmVfcHJvdmlkZXJzIGNyZWF0ZTpwaG9uZV9wcm92aWRlcnMgcmVhZDpwaG9uZV9wcm92aWRlcnMgdXBkYXRlOnBob25lX3Byb3ZpZGVycyBkZWxldGU6cGhvbmVfdGVtcGxhdGVzIGNyZWF0ZTpwaG9uZV90ZW1wbGF0ZXMgcmVhZDpwaG9uZV90ZW1wbGF0ZXMgdXBkYXRlOnBob25lX3RlbXBsYXRlcyBjcmVhdGU6ZW5jcnlwdGlvbl9rZXlzIHJlYWQ6ZW5jcnlwdGlvbl9rZXlzIHVwZGF0ZTplbmNyeXB0aW9uX2tleXMgZGVsZXRlOmVuY3J5cHRpb25fa2V5cyByZWFkOnNlc3Npb25zIGRlbGV0ZTpzZXNzaW9ucyByZWFkOnJlZnJlc2hfdG9rZW5zIGRlbGV0ZTpyZWZyZXNoX3Rva2VucyBjcmVhdGU6c2VsZl9zZXJ2aWNlX3Byb2ZpbGVzIHJlYWQ6c2VsZl9zZXJ2aWNlX3Byb2ZpbGVzIHVwZGF0ZTpzZWxmX3NlcnZpY2VfcHJvZmlsZXMgZGVsZXRlOnNlbGZfc2VydmljZV9wcm9maWxlcyBjcmVhdGU6c3NvX2FjY2Vzc190aWNrZXRzIGRlbGV0ZTpzc29fYWNjZXNzX3RpY2tldHMgcmVhZDpmb3JtcyB1cGRhdGU6Zm9ybXMgZGVsZXRlOmZvcm1zIGNyZWF0ZTpmb3JtcyByZWFkOmZsb3dzIHVwZGF0ZTpmbG93cyBkZWxldGU6Zmxvd3MgY3JlYXRlOmZsb3dzIHJlYWQ6Zmxvd3NfdmF1bHQgcmVhZDpmbG93c192YXVsdF9jb25uZWN0aW9ucyB1cGRhdGU6Zmxvd3NfdmF1bHRfY29ubmVjdGlvbnMgZGVsZXRlOmZsb3dzX3ZhdWx0X2Nvbm5lY3Rpb25zIGNyZWF0ZTpmbG93c192YXVsdF9jb25uZWN0aW9ucyByZWFkOmZsb3dzX2V4ZWN1dGlvbnMgZGVsZXRlOmZsb3dzX2V4ZWN1dGlvbnMgcmVhZDpjb25uZWN0aW9uc19vcHRpb25zIHVwZGF0ZTpjb25uZWN0aW9uc19vcHRpb25zIHJlYWQ6c2VsZl9zZXJ2aWNlX3Byb2ZpbGVfY3VzdG9tX3RleHRzIHVwZGF0ZTpzZWxmX3NlcnZpY2VfcHJvZmlsZV9jdXN0b21fdGV4dHMgY3JlYXRlOm5ldHdvcmtfYWNscyB1cGRhdGU6bmV0d29ya19hY2xzIHJlYWQ6bmV0d29ya19hY2xzIGRlbGV0ZTpuZXR3b3JrX2FjbHMgcmVhZDpjbGllbnRfY3JlZGVudGlhbHMgY3JlYXRlOmNsaWVudF9jcmVkZW50aWFscyB1cGRhdGU6Y2xpZW50X2NyZWRlbnRpYWxzIGRlbGV0ZTpjbGllbnRfY3JlZGVudGlhbHMgcmVhZDpvcmdhbml6YXRpb25fY2xpZW50X2dyYW50cyBjcmVhdGU6b3JnYW5pemF0aW9uX2NsaWVudF9ncmFudHMgZGVsZXRlOm9yZ2FuaXphdGlvbl9jbGllbnRfZ3JhbnRzIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwiYXpwIjoiNlk4aGFmQ2d6M0ROa0R6c0dLa2swYkI1alVpa2hYWmQifQ.gw5rNa4UBWFhklEz5CaYfKitRJqNy1TBfqGPhw86B0STOsxFXDXJTigZqqVEzYZnVLzi9x4S-LgLTCXqYQNx1cgVgM0y6K-fFbdvKZm-hcYg1tYsbGWVKWS70e40uo_ZhY6WjVYj15LtZzjs77Ibg8jqrU5Eb2EQUbz3hy1kBhyznRCiYbMH7VXbUTcp7LimQ-rtuxoyWQTL0zOjymwB_GX8ibX2nA6AX8FLsjfVOX1ud7mVMkxE5XqUPeOq79f9K4tnZ9x1oWqYuu1qM4-RSU18e2J6bqIijk-RXBY7-9tXFCPObIR7tSje-ZUV3mdroUot2zLFUubNgS_WLI3mFw";

      const response = await fetch(
        `https://blockchainsd.us.auth0.com/api/v2/users/${user_id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const utlPost = "http://localhost:8090/transaction";

      const request = {
        user_from: user.sub,
        user_to: user_id,
        amount: monto,
      };

      const postResponse = await fetchPost(urlProcessExecution, request);
      console.log(postResponse);
    } catch (error) {
      toast.error("El usuario no existe");
    }

    setShowPopup(false);
  };

  return (
    <>
      <div onClick={() => setShowPopup(true)} style={{ cursor: "pointer" }}>
        Transferencia
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Transferencia</h2>
            <label>
              user_id:
              <input
                type="text"
                placeholder="Ingrese su user_id"
                value={user_id}
                onChange={(e) => setUser_id(e.target.value)}
              />
            </label>
            <label>
              Monto:
              <input
                type="number"
                placeholder="Ingrese el monto"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </label>
            <button onClick={handleSubmit}>Enviar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default LeftOption;
