using System;
using System.Diagnostics;
using System.Runtime.InteropServices;
using zkemkeeper;

namespace BiometricNetFramework4
{
    internal class Bionet4
    {
        static void Main(string[] args)
        {
            CZKEM axCZKEM1 = new CZKEM(); // Create the SDK object

            int iMachineNumber = 1; // Device ID
            bool isConnected = axCZKEM1.Connect_Net("122.160.141.26", 4370); // Replace with your device IP

            if (!isConnected)
            {
                Console.WriteLine("Failed to connect to device.");
                return;
            }
            else
            {
                Console.WriteLine("Success! connect to device.");
            }

            axCZKEM1.EnableDevice(iMachineNumber, false); // Disable device while fetching data

            string enrollNumber = "";
            int verifyMode = 0, inOutMode = 0, year = 0, month = 0, day = 0, hour = 0, minute = 0, second = 0, workcode = 0;


            Console.WriteLine("Fetching Attendance Logs...\n");

            while (axCZKEM1.SSR_GetGeneralLogData(iMachineNumber, out enrollNumber, out verifyMode, out inOutMode,
                        out year, out month, out day, out hour, out minute, out second, ref workcode))
            {
                Console.WriteLine($"User: {enrollNumber}, Date: {year}-{month}-{day} {hour}:{minute}:{second}, Mode: {inOutMode}");
            }

            axCZKEM1.EnableDevice(iMachineNumber, true); // Re-enable device
            axCZKEM1.Disconnect();

            //Console.ReadKey();
        }
    }
}