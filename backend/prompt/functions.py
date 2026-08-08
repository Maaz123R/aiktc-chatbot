# backend/prompt/functions.py

FUNCTION_DEFINITIONS = [
    {
        "name": "show_text",
        "description": (
            "Display a plain text response. Use for: general factual answers, "
            "hostel info, out-of-KB general knowledge with disclaimer, "
            "troubleshooting escalation, all-LOW multi_pred follow-up alternatives text. "
            "Do NOT use for multi-category information (e.g., placements by school) — use show_list instead."
        ),
        "parameters": {
            "type": "object",
            "properties": {
                "message": {
                    "type": "string",
                    "description": "The complete response text. May include line breaks."
                }
            },
            "required": ["message"]
        }
    },
    {
        "name": "show_links",
        "description": (
            "Display a set of official links relevant to AIKTC users."
        ),
        "parameters": {
            "type": "object",
            "properties": {
                "title": {"type": "string"},
                "links": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "title": {"type": "string"},
                            "url": {"type": "string"},
                            "icon": {"type": "string"}
                        },
                        "required": ["title", "url", "icon"]
                    }
                }
            },
            "required": ["title", "links"]
        }
    },
    {
        "name": "show_table",
        "description": (
            "Display a structured data table. Use for: historical cutoff data by year, "
            "fee breakdown by category, intake seats by department, comparison of structured "
            "rows with columns. NOT for predictions."
        ),
        "parameters": {
            "type": "object",
            "properties": {
                "title": {"type": "string"},
                "columns": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "Column header names"
                },
                "rows": {
                    "type": "array",
                    "items": {
                        "type": "array",
                        "items": {"type": "string"}
                    },
                    "description": "Each inner array is one row, same length as columns"
                }
            },
            "required": ["title", "columns", "rows"]
        }
    },

    {
        "name": "show_media_card",
       "description": (
    "Display a profile card for a single person "
    "(Director, Principal, HOD, Dean, Faculty, Staff). "

    "For follow-up conversations such as "
    "'HOD' -> 'ECS', interpret the second message as "
    "'HOD of ECS'. "

    "If the KB contains an image for the person, "
    "image_url MUST be included."
),
        "parameters": {
            "type": "object",
            "properties": {
                "name": {"type": "string"},
                "designation": {"type": "string"},
                "initials": {
                    "type": "string",
                    "description": "REQUIRED. 2-3 chars. Used when image unavailable."
                },
                "image_url": {
                    "type": "string",
                    "description": "Optional. Relative path served from Vercel CDN."
                },
                "details": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "icon": {
                                "type": "string",
                                "description": "Tabler icon name e.g. ti-mail, ti-phone, ti-award"
                            },
                            "label": {"type": "string"},
                            "value": {"type": "string"}
                        },
                        "required": ["icon", "label", "value"]
                    }
                }
            },
           "required": [
    "name",
    "designation",
    "initials",
    "image_url",
    "details"
]
        }
    },
    {
        "name": "show_faculty_grid",
        "description": (
            "Display a grid of faculty cards for a department. "
            "Use when student asks about all faculty in a specific department."
        ),
        "parameters": {
            "type": "object",
            "properties": {
                "department": {
                    "type": "string",
                    "description": "Full department name e.g. Computer Science & Engineering"
                },
                "members": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "name": {"type": "string"},
                            "initials": {
                                "type": "string",
                                "description": "REQUIRED. 2 chars. Used when image unavailable."
                            },
                            "designation": {"type": "string"},
                            "specialization": {"type": "string"},
                            "experience": {"type": "string"},
                            "image_url": {"type": "string"}
                        },
                        "required": ["name", "initials", "designation"]
                    }
                }
            },
            "required": ["department", "members"]
        }
    },
    {
        "name": "show_comparison",
        "description": (
            "Display a side-by-side numeric comparison. Use ONLY for numeric data: "
            "fee comparison between departments, intake seat counts by department. "
            "NEVER use for labs, facilities, predictions, or non-numeric lists."
        ),
        "parameters": {
            "type": "object",
            "properties": {
                "title": {"type": "string"},
                "items": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "label": {"type": "string", "description": "e.g. department name"},
                            "value": {"type": "string", "description": "The numeric value e.g. '₹1,25,000'"},
                            "sublabel": {"type": "string", "description": "Optional sub-label"}
                        },
                        "required": ["label", "value"]
                    }
                }
            },
            "required": ["title", "items"]
        }
    },
    {
        "name": "show_list",
        "description": (
            "Display a list of items with descriptions. Use for: labs, facilities, "
            "clubs, bus routes, hostel facilities, placements by school/department, "
            "training programmes by category, scholarships by type, "
            "and any multi-category or multi-item non-numeric list "
            "where each item has a name + description. May include images."
        ),
        "parameters": {
            "type": "object",
            "properties": {
                "title": {"type": "string"},
                "items": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "name": {"type": "string"},
                            "description": {"type": "string"},
                            "image_url": {"type": "string"},
                            "location": {"type": "string"},
                            "badge": {"type": "string", "description": "Optional badge text e.g. 'Block A'"},
                            "initials": {
                                "type": "string",
                                "description": "Optional. Used as image fallback."
                            }
                        },
                        "required": ["name", "description"]
                    }
                }
            },
            "required": ["title", "items"]
        }
    },
    {
        "name": "show_steps",
        "description": (
            "Display a numbered step-by-step process. Use for: admission process, "
            "how to apply, how to get a document, how to register on portal."
        ),
        "parameters": {
            "type": "object",
            "properties": {
                "title": {"type": "string"},
                "steps": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "title": {"type": "string", "description": "Short step title"},
                            "detail": {"type": "string", "description": "Full step description"}
                        },
                        "required": ["title", "detail"]
                    }
                }
            },
            "required": ["title", "steps"]
        }
    },
    {
        "name": "show_contact",
        "description": (
            "Display contact information for escalation. Use when: student needs to "
            "speak to someone, has a problem the bot cannot solve, asks for contact details, "
            "or when no data is available for their query."
        ),
        "parameters": {
            "type": "object",
            "properties": {
                "reason": {
                    "type": "string",
                    "description": "Brief explanation of why escalation is needed"
                },
                "contacts": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "label": {"type": "string"},
                            "phone": {"type": "string"},
                            "email": {"type": "string"},
                            "hours": {"type": "string"},
                            "whatsapp": {"type": "string"}
                        },
                        "required": ["label"]
                    }
                }
            },
            "required": ["reason", "contacts"]
        }
    }
]