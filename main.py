import os
import web

urls = (
    '/', 'hello'
)

app = web.application(urls, globals())

environment = os.getenv('WEBPY_ENV', 'production')

class hello:
    def GET(self):
        return u'Hello '+ environment

#if __name__ == '__main__':
#    if environment is not 'production':
#        app.debug = True

#    app.run()
