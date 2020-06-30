package response

import (
	"encoding/json"
	"fmt"
	"strings"
)

// Error is used for all errored responses
type Error struct {
	Code      string      `json:"code"`
	Message   string      `json:"message"`
	RequestID string      `json:"requestId"`
	Data      interface{} `json:"data"`
}

// Bytes converts the `response.Error` instance into a slice of bytes
// for use with server responses
func (e Error) Bytes() []byte {
	asBytes, err := json.Marshal(e)
	if err != nil {
		asBytes, _ = json.Marshal(map[string]string{
			"code":      "JSON_MARSHAL_FAILED",
			"message":   "failed to marshal `response.Error` object to json",
			"requestId": e.RequestID,
			"data":      fmt.Sprintf("%v", e.Data),
		})
	}
	return asBytes
}

// String converts the `response.Error` instance into a string for use
// with output printing for debugging or whatever
func (e Error) String() string {
	var as strings.Builder
	if len(e.Code) > 0 {
		as.WriteString(fmt.Sprintf("[%s] ", e.Code))
	} else {
		as.WriteString("[UNKNOWN_ERROR] ")
	}

	if len(e.RequestID) > 0 {
		as.WriteString(fmt.Sprintf("%s ", e.RequestID))
	} else {
		as.WriteString("<no request id> ")
	}

	if len(e.Message) > 0 {
		as.WriteString(e.Message)
	} else {
		as.WriteString("(no message provided)")
	}

	if e.Data != nil {
		as.WriteString(fmt.Sprintf(": %v", e.Data))
	}
	return as.String()
}
