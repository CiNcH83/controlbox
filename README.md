# ControlBox

ControlBox is a sample EEBUS GridGuard implementation that implements these EEBUS use cases:

- EnergyGuard Limitation of Power Consumption (LPC)
- EnergyGuard Limitation of Power Production (LPP)
- MonitoringAppliance Monitoring of Power Consumption (MPC)
- MonitoringAppliance Monitoring of Grid Connection Point (MGCP)

Forked from [vollautomat's eebus-go](https://github.com/vollautomat/eebus-go), based on [enbility's eebus-go](https://github.com/enbility/eebus-go).

### Installation & Execution

#### ControlBox

Generate EEBUS certificate, key and SKI:
```
cd /path/to/controlbox
go run . 4712

-----BEGIN CERTIFICATE-----
MIIB4DCCAYagAwIBAgIUNZ5cJ2xKkKz3N7r0K9vK2A5x5EkwCgYIKoZIzj0EAwIw
STELMAkGA1UEBhMCREUxEzARBgNVBAoMCkVFQlVTIERFTU8xJTAjBgNVBAMMHEVF
QlVTIERldmljZSBDZXJ0ICMwMjAeFw0yNjAxMjAwMDAwMDBaFw0zNjAxMjAwMDAw
MDBaMEkxCzAJBgNVBAYTAkRFMRMwEQYDVQQKDApFRUJVUyBERU1PMRkwFwYDVQQD
DBBFRUJVUyBEZXZpY2UgMjBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABKqkH+5T
uZyPzVYzY5n1L8Qz6ZcQZbQ+0z0J9n5W2XvX8Kz3C3XWkFJ9B1k9g7y8wE3D8N6M
z3W8AqejUzBRMB0GA1UdDgQWBBQmC8kY8X1d6T2Jq1p4k8Yt9Jq3ETAfBgNVHSME
GDAWgBQmC8kY8X1d6T2Jq1p4k8Yt9Jq3ETAPBgNVHRMBAf8EBTADAQH/MAoGCCqG
SM49BAMCA0cAMEQCIGc5N6F6cF8mZQ3KkXyX9Z3kY1z4kMZx8Y1XKp7pAiA6c2VQ
nYF9s6XK2E5p3Yy2F1J6kKp8F7F5HcN4w==
-----END CERTIFICATE-----

-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIO3ZkY4pWZ7k4cZP0Kp0Z4QvV7yZ0pJ7nY2kN2Vf9FQBoAoGCCqGSM49
AwEHoUQDQgAEKqkH+5TuZyPzVYzY5n1L8Qz6ZcQZbQ+0z0J9n5W2XvX8Kz3C3XW
kFJ9B1k9g7y8wE3D8N6Mz3W8AqejUw==
-----END EC PRIVATE KEY-----

Local SKI: A46D9C217B8F335E921C4FAA087E615C9D2A73F0
```

Note the local SKI and save certificate and key to respective files (e.g. `cb.crt` and `cb.key`) and run the ControlBox:
```
go run . 4712 cb.crt cb.key
```

#### evcc

Generate EEBUS certificate and key for evcc via evcc CLI…
```
evcc eebus-cert
```

and add them to the `evcc.yaml` config file:
```
eebus:
  certificate:
    public: |
      -----BEGIN CERTIFICATE-----
      MIIB3TCCAYOgAwIBAgIUWZp7lZ9JcM8xE5cQ6+4JkF0yZVswCgYIKoZIzj0EAwIw
      RDELMAkGA1UEBhMCREUxEjAQBgNVBAoMCUVFQlVTIFRFU1QxHTAbBgNVBAMMFEVF
      QlVTIERldmljZSBDZXJ0MB4XDTI2MDEyMDAwMDAwMFoXDTM2MDEyMDAwMDAwMFow
      RDELMAkGA1UEBhMCREUxEjAQBgNVBAoMCUVFQlVTIFRFU1QxHTAbBgNVBAMMFEVF
      QlVTIERldmljZSBDZXJ0MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE9G5xQK+S
      M6a9uY+qF8bB9n3GJ3Xh7V1Z5zM2Y3m1K1j9m1W5l0yBzYVZbF3gY7Cw7b7F1P0E
      Yt7D6kUq8aNTMFEwHQYDVR0OBBYEFN5C8sKx8c7K8Zx9+5J7n8Z2cJ5LMB8GA1Ud
      IwQYMBaAFN5C8sKx8c7K8Zx9+5J7n8Z2cJ5LMA8GA1UdEwEB/wQFMAMBAf8wCgYI
      KoZIzj0EAwIDSAAwRQIhAKF4Ewz5kD3qgC9Z7U8xZ5M1X8J6cJ3FZp6n3mMRAiB
      4YF8uQ5pJwYVZJ4n9GZPZJmM9H4k7Z0n9F5YVQ==
      -----END CERTIFICATE-----
    private: |
      -----BEGIN EC PRIVATE KEY-----
      MHcCAQEEIDP6JmP0kK6J7QFZ6NnZ4qFZQ1T+9n9C5k9Z8FZqz0ZBoAoGCCqGSM49
      AwEHoUQDQgAE9G5xQK+SM6a9uY+qF8bB9n3GJ3Xh7V1Z5zM2Y3m1K1j9m1W5l0yB
      zYVZbF3gY7Cw7b7F1P0EYt7D6kUq8Q==
      -----END EC PRIVATE KEY-----
```

Add ControlBox to the `evcc.yaml`:
```
hems:
  type: eebus
  ski: A46D9C217B8F335E921C4FAA087E615C9D2A73F0 # local SKI of the ControlBox
```

Restarting evcc will automatically connect evcc to the ControlBox.

#### ControlBox Frontend

Install dependencies:
```
cd /path/to/controlbox/frontend
npm install
```

Run web server:
```
npm run dev
```

Open ControlBox UI via web browser URI:
```
http://localhost:7081/
```
