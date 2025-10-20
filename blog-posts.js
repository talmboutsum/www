const blogPosts = {
    "math": {
        "test": {
            "title": "Test",
            "date": "October 20, 2025",
            "description": "Read about test",
            "markdown": "# Graphing Example\r\n\r\nHere's a simple parabola:\r\n\r\n```graph\r\n{\r\n  \"xDomain\": [-5, 5],\r\n  \"yDomain\": [-2, 10],\r\n  \"xLabel\": \"x\",\r\n  \"yLabel\": \"y\",\r\n  \"functions\": [\r\n    {\r\n      \"fn\": \"x^2\",\r\n      \"color\": \"#83a5ba\"\r\n    }\r\n  ]\r\n}\r\n```\r\n\r\nMultiple functions:\r\n\r\n```graph\r\n{\r\n  \"xDomain\": [-10, 10],\r\n  \"yDomain\": [-5, 5],\r\n  \"functions\": [\r\n    {\r\n      \"fn\": \"sin(x)\",\r\n      \"color\": \"#a3c76f\"\r\n    },\r\n    {\r\n      \"fn\": \"cos(x)\",\r\n      \"color\": \"#e8b563\"\r\n    },\r\n    {\r\n      \"fn\": \"x/3\",\r\n      \"color\": \"#9e95c7\"\r\n    }\r\n  ]\r\n}\r\n```\r\n\r\nParametric equations (circle):\r\n\r\n```graph\r\n{\r\n  \"xDomain\": [-2, 2],\r\n  \"yDomain\": [-2, 2],\r\n  \"functions\": [\r\n    {\r\n      \"fnType\": \"parametric\",\r\n      \"x\": \"cos(t)\",\r\n      \"y\": \"sin(t)\",\r\n      \"range\": [0, 6.283185],\r\n      \"color\": \"#e09855\",\r\n      \"graphType\": \"polyline\"\r\n    }\r\n  ]\r\n}\r\n```\r\n\r\nPolar equations (rose):\r\n\r\n```graph\r\n{\r\n  \"xDomain\": [-2.5, 2.5],\r\n  \"yDomain\": [-2.5, 2.5],\r\n  \"functions\": [\r\n    {\r\n      \"fnType\": \"polar\",\r\n      \"r\": \"2 * sin(3 * theta)\",\r\n      \"color\": \"#83a5ba\",\r\n      \"graphType\": \"polyline\"\r\n    }\r\n  ]\r\n}\r\n```\r\n"
        }
    },
    "personal": {
        "me": {
            "title": "Me",
            "date": "October 20, 2025",
            "description": "Read about me",
            "markdown": "# Me\r\n\r\nHello,\r\nthis is the first post on this website.\r\n\r\njust wanted to say hi.\r\n"
        }
    },
    "tests": {
        "test1": {
            "title": "Test1",
            "date": "October 20, 2025",
            "description": "Read about test1",
            "markdown": "```c\r\n#define B 0\r\n\r\nint main()\r\n{\r\n    return B;\r\n}\r\n```\r\n\r\n$$\r\n\\f\\relax{x} = \\int_{-\\infty}^\\infty\r\n    \\f\\hat\\xi\\,e^{2 \\pi i \\xi x}\r\n    \\,d\\xi\r\n$$\r\n"
        }
    }
};