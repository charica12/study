import os
import time
import multiprocessing

class Worker(multiprocessing.Process) :
    def __init__(self, name, args):
        multiprocessing.Process.__init__(self)
        self.name = name
        self.args = args

    def run(self):
        print("name : %s, argument : %s" % (self.name, self.args[0]))
        print("parent pid : %s, pid : %s" % (os.getppid(), os.getpid()))
        print("")

def main() :
    for i in range(5) :
        p = Worker(name = "process %i" % i, args = (i,))
        p.start()
        time.sleep(1)

if __name__ == "__main__" :
    main()