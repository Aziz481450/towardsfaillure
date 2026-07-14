namespace TowardsFailure.API.Helpers;

public static class EpleyFormula
{
    public static double Estimate1Rm(double weight, int reps)
    {
        if (reps == 1) return weight;
        if (reps <= 0 || weight <= 0) return 0;
        return weight * (1 + reps / 30.0);
    }
}
