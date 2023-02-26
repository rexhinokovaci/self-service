package self_service

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

// QRCodeRequest represents the JSON request body for generating a QR code
type QRCodeRequest struct {
	Data string `json:"data"`
}

// QRCodeResponse represents the JSON response body for a generated QR code
type QRCodeResponse struct {
	ImageURL string `json:"image_url"`
}

func main() {
	http.HandleFunc("/qrcode", generateQRCodeHandler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func generateQRCodeHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	var reqBody QRCodeRequest
	err := json.NewDecoder(r.Body).Decode(&reqBody)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "Error parsing request body: %v", err)
		return
	}

	qr, err := qrcode.Encode(reqBody.Data, qrcode.Medium, 256)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Error generating QR code: %v", err)
		return
	}

	imageURL := "data:image/png;base64," + qr.ToDataURL()

	resp := QRCodeResponse{ImageURL: imageURL}

	jsonResp, err := json.Marshal(resp)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Error generating JSON response: %v", err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonResp)
}
