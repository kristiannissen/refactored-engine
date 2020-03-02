import os
import web

urls = (
    '/(.*)', 'hello'
)

app = web.application(urls, globals())

class hello:
    def GET(self, name):
        env = os.getenv('APP_ENV', 'production')
        return u'Hello '+ name + ' ' + env

if __name__ == '__main__':
    app.run()
