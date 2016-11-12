package OPENBEXI;

class myThread1 extends Thread {
    private Thread t;
    private String threadName;
    public boolean status = false;

    myThread1(String name) {
        threadName = name;
        System.out.println("--Creating " + threadName);
    }

    public synchronized void work() {
        System.out.println("--Running " + threadName);
        for (int i=0;i<10;i++) {
            try {
                wait(300000);
            } catch (Exception e) {
                System.out.println("Thread1 " + threadName + " interrupted.");
            }
            if (i==0)
            System.out.println("Thread1 " + threadName + " exiting.");
            else
                System.out.println("Thread1 " + threadName + " exiting again.");
        }
    }

    @Override
    public void run() {
        this.work();
    }
}

class myThread2 extends Thread {
    private Thread t;
    private String threadName;
    public boolean status = false;

    myThread2(String name) {
        threadName = name;
        System.out.println("--Creating " + threadName);
    }

    public synchronized void work() {
        System.out.println("--Running " + threadName);
        for (int i=0;i<5;i++) {
            System.out.println("Thread2 " + threadName + " notifying all treads.");
            try {
                Thread.sleep(5000);
                notifyAll();
            } catch (Exception e) {
                System.err.print(e.getMessage());
            }
            System.out.println("Thread2 " + threadName + " notified all treads.");
        }
    }

    @Override
    public void run() {
        this.work();
    }

}

public class RunnableBEXI {
    public static void main(String args[]) {

        myThread1 R1 = new myThread1("Thread-1");
        R1.start();

        myThread2 R2 = new myThread2("Thread-2");
        R2.start();
    }
}