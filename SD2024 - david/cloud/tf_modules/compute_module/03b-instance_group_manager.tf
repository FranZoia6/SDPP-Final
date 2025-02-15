resource "google_compute_instance_group_manager" "this" {
  name        = "sdinstancegroup"
  description = "sd_gc_icm"

  base_instance_name = "sd"
  zone               = var.zone

  version {
    name              = "deployed-version"
    instance_template = google_compute_instance_template.this.id
  }

  target_size = 1

  named_port {
    name = "web"
    port = 80
  }

  auto_healing_policies {
    health_check      = google_compute_health_check.autohealing.id
    initial_delay_sec = 60
  }

  update_policy {
    type                  = "PROACTIVE"
    minimal_action        = "REPLACE"
    max_surge_percent     = 100
    max_unavailable_fixed = 0
    replacement_method    = "SUBSTITUTE"
  }
}

resource "google_compute_health_check" "autohealing" {
  name                = "sd-autohealing"
  check_interval_sec  = 5
  timeout_sec         = 5
  healthy_threshold   = 2
  unhealthy_threshold = 10

  http_health_check {
    request_path = "/"
    port         = "80"
  }
}
